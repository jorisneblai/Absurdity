import LogFormLogIn from "./LogFormLogIn/LogFormLogIn";
import LogFormSignUp from "./LogFormSignUp/LogFormSignUp";
import LogMenu from "./LogMenu/LogMenu";

function LogPage() {
  return ( 
    <section className="LogPage">
      <LogMenu/>
      {/*<LogFormSignUp/>*/}
      <LogFormLogIn/>
    </section>
  );
}

export default LogPage;