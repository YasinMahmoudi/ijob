function CounterIcon({ children,count }) {
  return (
    <div className="counter-icon">
      {children}
      <span>{count}</span>
    </div>
  );
}

export default CounterIcon;
