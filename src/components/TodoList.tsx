import Button from "./ui/Button";
import { Idata as Itodo, ItodoCreate } from "../Interfaces/Interfaces";
import UseAuthenticatedQuery from "../Hooks/useAuthenticatedQuery";
import Modal from "./ui/Model";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import axioInstance from "./config/config.instance";
import { validationModel } from "../validation/ValidationError";
import Errormsg from "./ui/Errormes";
import { TodoSkeleton } from "./ui/todoSkeleton";
import { faker } from "@faker-js/faker";

const TodoList = () => {
  // const [todos ,settodos] =useState([]);
  // const [loggedin , setloggedin] =useState(true)
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isOpen, setIsOpen] = useState(false);
  const [isUbdatting, setisUbdatting] = useState(false);
  const [isCreateNewTodo, setisCreateNewTodo] = useState(false);
  const [queryVersion, setqueryVersion] = useState(1);

  const [isOpenConfirmModel, setisOpenConfirmModel] = useState(false);
  const [todoEditModel, setTodoEditModel] = useState<Itodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [todoCreate, settodoCreate] = useState<ItodoCreate>({
    title: "",
    description: "",
  });
  const [errorsmsg, seterrorsmsg] = useState({
    title: "",
    description: "",
  });

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
    queryKey: ["todos", `${queryVersion}`],
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

  // *** Close and open model

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

  const isOpenRemoveModel = (todo: Itodo) => {
    setisOpenConfirmModel(true);
    setTodoEditModel(todo);
  };
  const isClodseRemoveModel = () => {
    setisOpenConfirmModel(false);
    setTodoEditModel({
      id: 0,
      title: "",
      description: "",
    });
  };

  const onOpenCreateModel = () => setisCreateNewTodo(true);
  const onCloseCreateModel = () => {
    setisCreateNewTodo(false);
    settodoCreate({
      title: "",
      description: "",
    });
  };
  // *** Handelers

  const inputHandelers = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setTodoEditModel({
      ...todoEditModel,
      [name]: value,
    });
    seterrorsmsg({
      title: "",
      description: "",
    });
  };

  const inputHandelersCreate = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    settodoCreate({
      ...todoCreate,
      [name]: value,
    });
    seterrorsmsg({
      title: "",
      description: "",
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
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
      const { status } = await axioInstance.put(
        `/todos/${todoEditModel.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      console.log(status);
      if (status == 200) {
        onCloseEditModel();
        setqueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisUbdatting(false);
    }
    seterrorsmsg({
      title: "",
      description: "",
    });
  };

  const isRemove = async () => {
    try {
      const { status } = await axioInstance.delete(
        `/todos/${todoEditModel.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status == 200) {
        isClodseRemoveModel();
        setqueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisUbdatting(true);

    console.log(todoEditModel);

    const errorMessage = validationModel({
      title: todoCreate.title,
      description: todoCreate.description,
    });

    const haserrormesage =
      Object.values(errorMessage).some((value) => value == "") &&
      Object.values(errorMessage).every((value) => value == "");
    if (!haserrormesage) {
      seterrorsmsg(errorMessage);
      setisUbdatting(false);
      return;
    }

    const { title, description } = todoCreate;
    try {
      const { status } = await axioInstance.post(
        `/todos`,
        { data: { title, description, user: [userData.user.id] } },

        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      console.log(status);
      if (status == 200) {
        onCloseCreateModel();
        setqueryVersion((prev) => prev + 1);
        console.log(userData.user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisUbdatting(false);
    }
    seterrorsmsg({
      title: "",
      description: "",
    });
  };

  const onGenereateTodo = async () => {
    for (let i = 0; i < 100; i++) {
      try {
        const { data } = await axioInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraph(2),
              user: [userData.user.id],
            },
          },

          {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div className="space-y-1 ">
      {isLoading ? (
        <div className="flex justify-center my-10 mx-3 space-x-2">
          <div className="h-9 w-32 bg-gray-300 rounded-md  dark:bg-gray-400 "></div>
          <div className="h-9 w-32 bg-gray-300 rounded-md  dark:bg-gray-400 "></div>
        </div>
      ) : (
        <div className="flex justify-center my-10 mx-3 space-x-2">
          <Button onClick={onOpenCreateModel} size={"sm"}>
            Post new todo
          </Button>
          <Button variant={"outline"} size={"sm"} onClick={onGenereateTodo}>
            Generate todos
          </Button>
        </div>
      )}

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
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => isOpenRemoveModel(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>No todo yet!</h3>
      )}
      {/* // ** Edit model */}
      <Modal closeModal={onCloseEditModel} isopen={isOpen} title="Edit todos">
        <form onSubmit={onSubmitHandler} className="space-y-3">
          <Input
            name="title"
            onChange={inputHandelers}
            value={todoEditModel.title}
          />
          <Errormsg msg={errorsmsg.title} />
          <Textarea
            name="description"
            onChange={inputHandelers}
            value={todoEditModel.description}
          />
          <Errormsg msg={errorsmsg.description} />
          <div className="flex justify-evenly mt-4">
            <Button
              isloading={isUbdatting}
              className="bg-indigo-500 hover:bg-indigo-300"
            >
              Update
            </Button>
            <Button variant="cancel" onClick={onCloseEditModel} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* // ** Remove model */}
      <Modal
        title="Are You sure you want to remove this product from your store ?"
        isopen={isOpenConfirmModel}
        closeModal={isClodseRemoveModel}
      >
        <div className="flex justify-evenly mt-4">
          <Button variant="danger" onClick={isRemove}>
            {" "}
            Yes , Remove
          </Button>
          <Button variant="cancel" onClick={isClodseRemoveModel} type="button">
            Cancle
          </Button>
        </div>
      </Modal>

      {/* // ** Create todo model */}
      <Modal
        closeModal={onCloseCreateModel}
        isopen={isCreateNewTodo}
        title="Create todos"
      >
        <form onSubmit={onCreateHandler} className="space-y-3">
          <Input
            name="title"
            onChange={inputHandelersCreate}
            value={todoCreate.title}
          />
          <Errormsg msg={errorsmsg.title} />
          <Textarea
            name="description"
            onChange={inputHandelersCreate}
            value={todoCreate.description}
          />
          <Errormsg msg={errorsmsg.description} />
          <div className="flex justify-evenly mt-4">
            <Button
              isloading={isUbdatting}
              className="bg-indigo-500 hover:bg-indigo-300"
            >
              Done
            </Button>
            <Button variant="cancel" onClick={onCloseCreateModel} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
