import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

export default function TransactionsPage({
  books,
  transactions,
  onRecordTransaction,
}) {
  return (
    <div>
      <section className="page-intro">
        <div>
          <p className="eyebrow">Availability management</p>
          <h2>Transactions</h2>
          <p>Add stock when books arrive or deduct stock when books are borrowed.</p>
        </div>
      </section>

      <div className="management-grid">
        <TransactionForm books={books} onRecord={onRecordTransaction} />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}
