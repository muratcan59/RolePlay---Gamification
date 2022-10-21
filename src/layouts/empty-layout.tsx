interface IProps {
  children: any;
}
const EmptyLayout = ({ children }: IProps) => {
  return <> {children}</>;
};
export default EmptyLayout;
