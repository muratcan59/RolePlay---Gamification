
interface IProps {
  logo: string;
}

const Logo = ({ logo }: IProps) => {
  return (
    <div className="logo">
      <a href="/">
        <img src={process.env.REACT_APP_API_WEBFORM + "/" + logo + ".d"} />
      </a>
    </div>
  )
}

export default Logo;