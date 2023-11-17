import { createContext } from "react";

// type AdminDetails = {
//     id: number;
//     name: string;
//     location: string;
//     charge_customers: boolean;
//     amount: {
//         category_6: number;
//         category_7: number;
//         category_8: number;
//         category_9: number;
//         category_10: number;
//     }
// } | null;

// type Admin = {
//     adminId: number;
//     adminDetails: AdminDetails | null;
// } | null;

// interface AdminContextInterface {
//     admin: Admin;
//     setAdmin: (admin: Admin) => void;
// }

const AdminContext = createContext<any>(null);

export default AdminContext;

