import "./DApp.scss";

const DApp: React.FC = () => {
  const onConnect: React.MouseEventHandler<HTMLButtonElement> = () => {
    try {
      console.log("Click");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="DApp">
      <header className="DApp-header">
        <h1>calend3</h1>
        <p id="slogan">Web3 appointment scheduler</p>
      </header>
      <button onClick={onConnect}>connect wallet</button>
    </div>
  );
};

export default DApp;
