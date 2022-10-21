interface IAlert {
  variant?: string;
  description?: string;
}

const Alert = ({ variant, description }: IAlert) => {
  return (
    description === null ? <></> : <div className="TABLE_INFO"><div className={variant?.toUpperCase()}>{description}</div></div>
  );
};

export default Alert;