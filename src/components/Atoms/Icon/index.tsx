interface IIcons {
  icon: string | undefined;
  w?: string;
  h?: string;
}
const Icon: React.FC<IIcons> = ({ icon, w = "30px", h = "30px" }) => {
  return <img src={icon} className={`w-[${w}] h-[${h}]`} />;
};

export default Icon;
