import {useEffect} from "react";

const HomePage = () => {

  useEffect(() => {
    document.title = "Welcome to, Noterr Project"
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center">Home Page</h1>
      </div>
    </>
  )
}

export default HomePage