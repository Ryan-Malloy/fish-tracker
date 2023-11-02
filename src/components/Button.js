const Button = ({ color, text }) => {
    return (
      <button className={`btn btn-${color}`} >{text}</button>
    )
  }
  
  export default Button;
  