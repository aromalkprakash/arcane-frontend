import Conversation from "./conversation";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r bg-black p-4 flex flex-col w-[25%]">
      <SearchInput/>
      <div className="divider px-3"></div>
      <Conversation/>
    </div>
  );
};
export default Sidebar;
