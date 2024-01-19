import { ChangeEvent, useState } from "react";
import UseAuthenticatedQuery from "../Hooks/useAuthenticatedQuery";
import Paginator from "../components/ui/Painattor";
import Button from "../components/ui/Button";
import axioInstance from "../components/config/config.instance";
import { faker } from "@faker-js/faker";




function Todospag() {

  

  
  const [page , setPage]=useState<number>(1)
  const [pageSize , setPageSize]=useState<number>(10)
  const [sertBy , setSertBy]=useState<string>("ASC")
  const [Count , setCount]=useState<number>(1)


  
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { data, isLoading ,isFetching} = UseAuthenticatedQuery({
    queryKey: [`todos-page-${page}`,`${pageSize}`,`${sertBy}`,`${Count}`],
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sertBy}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  console.log(pageSize);
  

  if (isLoading) return <h3>Loadding...</h3>;


  // ** Handlers 
  const onClickNextHanler =()=>{
    setPage(prev => prev +1)


  }
  const onClickPextHanler =()=>{
    setPage(prev => prev -1)
  }
  const OnChangeHandler =(e : ChangeEvent<HTMLSelectElement>)=>{
    setPageSize(+(e.target.value))

  }
  
  const OnChangeHandlerSertBy =(e : ChangeEvent<HTMLSelectElement>)=>{
    setSertBy(e.target.value)

  }
  console.log(sertBy);
  
  const onGenereateTodos = async () => {
    for (let i = 0; i < 20; i++) {
      try {
        const {status}= await axioInstance.post(
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
        if(status ==200) {
          setCount(prev => prev+1)
        }
      } catch (error) {
        console.log(error);
      }
      
    }
  };


  return (
    <div className="space-y-1 mx-auto w-3/5">
      
      <div className="flex justify-between my-10 mx-3 space-x-2">
          <Button variant={"outline"} size={"sm"} onClick={onGenereateTodos}>
            Generate 20 todos
          </Button>

      <div className="space-x-2">
        <select className="border border-indigo-400 rounded-md p-2 outline-none" value={sertBy} onChange={OnChangeHandlerSertBy}>
        <option disabled >Sert By</option>
        <option  value={"ASC"}>Oldest</option>
        <option value={"DESC"}>Lates</option>

        </select>
      <select className="border border-indigo-400 rounded-md p-2" value={pageSize} onChange={OnChangeHandler}>
        <option disabled >Page siaze</option>
        <option  value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
         </select>
      </div>
        </div>
     
     
      {data.data.length ? (
        data.data.map(
          ({
            id,
            attributes,
          }: {
            id: number;
            attributes: { title: string };
          }) => (
            <div
              key={id}
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
            >
              {id}-<h3 className="w-full font-semibold">{attributes.title}</h3>
            </div>
          )
        )
      ) : (
        <h3>No todo yet!</h3>
      )}
      <Paginator total={data.meta.pagination.total} page={page} pageCount={data.meta.pagination.pageCount} fetching={isLoading||isFetching} onClickNext={onClickNextHanler} onClickPrev={onClickPextHanler} />
    </div>
  );
}

export default Todospag;
