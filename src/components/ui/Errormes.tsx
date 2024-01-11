interface Ipropse {
    msg: string;
  }
  function Errormsg({ msg }: Ipropse) {
    return (
      <>
        <span className="block text-red-700 text-md">{msg}</span>
      </>
    );
  }
  
  export default Errormsg;