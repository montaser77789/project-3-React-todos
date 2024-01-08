import Button from "./ui/Button";
import { Idata } from "../Interfaces/Interfaces";
import UseAuthenticatedQuery from "../Hooks/useAuthenticatedQuery";

const TodoList = () => {
  // const [todos ,settodos] =useState([]);
  // const [loggedin , setloggedin] =useState(true)
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

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

  const { data, isLoading } = UseAuthenticatedQuery({queryKey:["todos"],url:"/users/me?populate=todos",config:{
    headers:{
      Authorization:`Bearer ${userData.jwt}`
    }
  }})
  
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

  return (
    <div className="space-y-1 ">
      {data.todos.length ? (
        data.todos.map((todo:Idata) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"}>Edit</Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todo yet!</h3>
      )}
    </div>
  );
};

export default TodoList;
