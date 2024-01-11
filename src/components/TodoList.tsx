import Button from "./ui/Button";
import { Idata as Itodo } from "../Interfaces/Interfaces";
import UseAuthenticatedQuery from "../Hooks/useAuthenticatedQuery";
import Modal from "./ui/Model";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import axioInstance from "./config/config.instance";
import { validationModel } from "../validation/ValidationError";
import Errormsg from "./ui/Errormes";

const TodoList = () => {
  // const [todos ,settodos] =useState([]);
  // const [loggedin , setloggedin] =useState(true)
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isOpen, setIsOpen] = useState(false);
  const [isUbdatting, setisUbdatting] = useState(false);
  const [isOpenConfirmModel, setisOpenConfirmModel] = useState(false);


  const [todoEditModel, setTodoEditModel] = useState<Itodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [errorsmsg,seterrorsmsg]=useState ({
    title:"",
    description:""
  })

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
    queryKey: ["todos" ,`${todoEditModel.id}`],
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

  // *** Handelers

  const onOpenEditModel = (todo: Itodo) => {
    setIsOpen(true);
    setTodoEditModel(todo);
  };
  const onCloseEditModel = () => {
    setIsOpen(false);
    setTodoEditModel({
      id: 0,
      title: "",
      description: "",
    });
  };

  const inputHandelers = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setTodoEditModel({
      ...todoEditModel,
      [name]: value,
    });
    seterrorsmsg({
      title:"",
      description:""
    })
  };

  const isOpenRemoveModel =()=>setisOpenConfirmModel(true)
  const isClodseRemoveModel =()=>setisOpenConfirmModel(false) 

  const submitHandelers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisUbdatting(true);

    console.log(todoEditModel);

    const errorMessage = validationModel({
      title: todoEditModel.title,
      description: todoEditModel.description,
    });

    const haserrormesage =
      Object.values(errorMessage).some((value) => value == "") &&
      Object.values(errorMessage).every((value) => value == "");
    if (!haserrormesage) {
      seterrorsmsg(errorMessage);
      setisUbdatting(false);
      return;
    }    
    
    const { title, description } = todoEditModel;
    try {
      const {status} = await axioInstance.put(
        `/todos/${todoEditModel.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      console.log(status);
      if(status==200){
        onCloseEditModel()
      }
    } catch (error) {
      console.log(error);
    }finally{
      setisUbdatting(false)
    }
    seterrorsmsg({
      title:"",
      description:""
    })
   
    
  };

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="space-y-1 ">
      {data.todos.length ? (
        data.todos.map((todo: Itodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button onClick={() => onOpenEditModel(todo)} size={"sm"}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"} onClick={isOpenRemoveModel} >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todo yet!</h3>
      )}
      <Modal closeModal={onCloseEditModel} isopen={isOpen} title="Edit todos">
        <form onSubmit={submitHandelers} className="space-y-3">
          <Input
            name="title"
            onChange={inputHandelers}
            value={todoEditModel.title}
          />
                    <Errormsg msg={errorsmsg.title}/>
          <Textarea
            name="description"
            onChange={inputHandelers}
            value={todoEditModel.description}
          />
          <Errormsg msg={errorsmsg.description}/>
          <div className="flex justify-evenly mt-4">
            <Button isloading={isUbdatting} className="bg-indigo-500 hover:bg-indigo-300">
              Update
            </Button>
            <Button variant="cancel" onClick={onCloseEditModel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal title="Are You sure you want to remove this product from your store ?"
      isopen={isOpenConfirmModel}
      closeModal={isOpenRemoveModel}
      >
        <div className="flex justify-evenly mt-4">
            <Button variant="danger"> Yes , Remove</Button>
        <Button variant="cancel" onClick={isClodseRemoveModel}>Cancle</Button>
        </div>
      

      </Modal>
    </div>
  );
};

export default TodoList;
