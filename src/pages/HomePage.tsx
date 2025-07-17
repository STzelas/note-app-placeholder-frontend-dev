import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to, Noterr Project"
  }, []);

  const redirect = () => {
    navigate("/login");
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-center mt-50">Welcome to my app!</h1>
        <div className={"flex items-center justify-center space-y-4 mt-5"}>
          <Button
            className={""}
            onClick={redirect}
          >
            Go to login!
          </Button>
        </div>

      </div>
    </>
  )
}

export default HomePage