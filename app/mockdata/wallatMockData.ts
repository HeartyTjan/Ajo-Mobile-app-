// export type Transaction = {
//   id: string;
//   category: string;
//   label: string;
//   amount: number;
//   type: "credit" | "debit";
//   date: string;
//   icon: string;
// };

// export type Wallet = {
//   accountNumber: string;
//   balance: number;
//   currency: string;
//   transactions: Transaction[];
// };

// const mockWallet: Wallet = {
//   accountNumber: "3029383829",
//   balance: 128560.75,
//   currency: "USD",
//   transactions: [
//     {
//       id: "1",
//       category: "Car",
//       label: "Fuel",
//       amount: 120.0,
//       type: "debit",
//       date: "2025-06-16",
//       icon: "car",
//     },
//     {
//       id: "2",
//       category: "Food",
//       label: "Bread",
//       amount: 6.3,
//       type: "debit",
//       date: "2025-06-16",
//       icon: "bread-slice",
//     },
//     {
//       id: "3",
//       category: "Mobile",
//       label: "Phone",
//       amount: 20.0,
//       type: "debit",
//       date: "2025-06-16",
//       icon: "mobile-alt",
//     },
//     {
//       id: "4",
//       category: "Present",
//       label: "Picture",
//       amount: 360.0,
//       type: "debit",
//       date: "2025-06-16",
//       icon: "gift",
//     },
//     {
//       id: "5",
//       category: "Pet",
//       label: "Feed",
//       amount: 36.4,
//       type: "debit",
//       date: "2025-06-16",
//       icon: "paw",
//     },
//     {
//       id: "6",
//       category: "Funding",
//       label: "Wallet Top-up",
//       amount: 500.0,
//       type: "credit",
//       date: "2025-06-15",
//       icon: "plus-circle",
//     },
//   ],
// };

// export const getWalletData = async (): Promise<Wallet> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockWallet);
//     }, 300);
//   });
// };
