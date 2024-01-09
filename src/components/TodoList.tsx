import Button from "./ui/Button";
import { Idata } from "../Interfaces/Interfaces";
import UseAuthenticatedQuery from "../Hooks/useAuthenticatedQuery";
import Modal from "./ui/Model";
import Input from "./ui/Input";
import { useState } from "react";

const TodoList = () => {
  // const [todos ,settodos] =useState([]);
  // const [loggedin , setloggedin] =useState(true)
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(()=>{
  //   try{
  //     axioInstance.get("/users/me?populate=todos",{
  //       headers:{
  //         Authorization:`Bearer ${userData.jwt}`
  //       }
  //     }).then(res => settodos(res.data.todos))
  //     .then(erroe => `Error ${console.log(erroe)}`);
  //   }catch(error){
  //     console.log(error);
  //   }finally{
  //     setloggedin(false)
  //   }
  // },[userData.jwt])
  // if(loggedin) return <h3>Loadding...</h3>;

  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // useQuery({
  //   queryKey: ["todos"],
  //   queryFn: async () => {
  //     const { data } = await axioInstance.get("/users/me?populate=todos", {
  //       headers: {
  //         Authorization: `Bearer ${userData.jwt}`,
  //       },
  //     });
  //     return data;
  //   },
  // });
  if (isLoading) return <h3>Loading...</h3>;

  const onToogelModel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="space-y-1 ">
      {data.todos.length ? (
        data.todos.map((todo: Idata) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button onClick={onToogelModel} size={"sm"}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todo yet!</h3>
      )}
      <Modal closeModal={onToogelModel} isopen={isOpen} title="Edit todos">
        <Input />
        <div className="flex justify-evenly mt-4">
          <Button className="bg-indigo-500 hover:bg-indigo-300">Edit</Button>
          <Button variant="cancel" onClick={onToogelModel}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
