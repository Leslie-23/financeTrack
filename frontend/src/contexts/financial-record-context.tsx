import { createContext, useState } from "react";
import { useContext } from "react";
interface FinancialRecord {
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}
interface FinancialRecordsContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  //   updateRecord: (id: string, newRecord: FinancialRecord) => void;
  //   deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);
export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("https://localhost:3000/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
    });
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.log("error from the addRecord function");
    }
  };
  return (
    <FinancialRecordContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordContext
  );
  if (!context) {
    throw new Error("useFinancialRecords must be used in a context provider");
  }
  return context;
};
