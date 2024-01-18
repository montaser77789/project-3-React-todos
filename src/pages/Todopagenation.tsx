import UseAuthenticatedQuery from "../Hooks/useAuthenticatedQuery";
import Paginator from "../components/ui/Painattor";

function Todospag() {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: ["pagintedTodos"],
    url: "/todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  if (isLoading) return <h3>Loadding...</h3>;

  return (
    <div className="space-y-1">
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
      <Paginator />
    </div>
  );
}

export default Todospag;
