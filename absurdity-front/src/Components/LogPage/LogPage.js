import LogFormLogIn from "./LogFormLogIn/LogFormLogIn";
import LogFormSignUp from "./LogFormSignUp/LogFormSignUp";
import LogMenu from "./LogMenu/LogMenu";

function LogPage() {
  return ( 
    <div className="LogPage">
      <LogMenu/>
      <LogFormSignUp/>
      <LogFormLogIn/>
    </div>
  );
}

export default LogPage;