import React, { createContext, useContext, useState } from 'react';

const InventoryContext = createContext<any>(null);

export function InventoryProvider({ children }: { children: React.ReactNode }) {

    const [products, setProducts] = useState([
    { id: '1', sku: 'SKU001', name: 'Widget A', price: 19.99, quantity: 15 },
    { id: '2', sku: 'SKU002', name: 'Widget B', price: 25.50, quantity: 8 },
      { id: '3', sku: 'SKU004', name: 'Widget C', price: 19.99, quantity: 14 },
    { id: '4', sku: 'SKU003', name: 'Widget V', price: 25.50, quantity: 4 },
      { id: '5', sku: 'SKU005', name: 'Widget D', price: 19.99, quantity: 5 },
    { id: '6', sku: 'SKU006', name: 'Widget S', price: 25.50, quantity: 64 },
      { id: '7', sku: 'SKU007', name: 'Widget K', price: 19.99, quantity: 53 },
    { id: '8', sku: 'SKU008', name: 'Widget K', price: 25.50, quantity: 83 },
      { id: '9', sku: 'SKU009', name: 'Widget S', price: 19.99, quantity: 152 },
    { id: '10', sku: 'SKU0010', name: 'Widget L', price: 25.50, quantity: 85 },
      { id: '11', sku: 'SKU0011', name: 'Widget J', price: 19.99, quantity: 25 },
    { id: '12', sku: 'SKU0012', name: 'Widget M', price: 25.50, quantity: 81 },
      { id: '13', sku: 'SKU0013', name: 'Widget N', price: 19.99, quantity: 55 },
    { id: '14', sku: 'SKU0014', name: 'Widget H', price: 25.50, quantity: 85 },
      { id: '15', sku: 'SKU0015', name: 'Widget G', price: 19.99, quantity: 54 },
    { id: '16', sku: 'SKU0016', name: 'Widget o', price: 25.50, quantity: 34 },
      { id: '17', sku: 'SKU0017', name: 'Widget A', price: 19.99, quantity: 65 },
    { id: '18', sku: 'SKU0018', name: 'Widget W', price: 25.50, quantity: 34 },
  ]);

  const [transactions, setTransactions] = useState<any[]>([
    { id: 't1', type: 'IN', sku: 'SKU001', amount: 15, date: new Date().toLocaleTimeString() }
  ]);

  const addTransaction = (type: 'IN' | 'OUT' | 'NEW', sku: string, amount: number, quantity: number) => {
    const newLog = {
      id: `${Date.now()}-${sku}`, 
      type,
      sku,
      amount,
      quantity,
      date: new Date().toLocaleTimeString(),
    };
    setTransactions(prev => [newLog, ...prev]);
  };

  const addProduct = (product: any) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
    addTransaction('NEW', product.sku, Number(product.quantity), Number(product.quantity));  };

 const updateStock = (id: string, amount: number) => {
  setProducts(prev => prev.map(p => {
    if (p.id === id) {
      const newQty = p.quantity + amount;
      if (newQty < 0) return p; 

      addTransaction(amount > 0 ? 'IN' : 'OUT', p.sku, Math.abs(amount), newQty);

      return { 
        ...p, 
        quantity: newQty, 
        lastUpdated: new Date().toLocaleTimeString() 
      };
    }
    return p;
  }));
};

  return (
    <InventoryContext.Provider value={{ products, addProduct, updateStock, transactions }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);