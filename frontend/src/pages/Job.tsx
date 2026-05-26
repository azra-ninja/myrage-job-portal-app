import { useParams } from "react-router-dom"
import { useGetJob } from "../tanstack/query/useGetJob";
import Loader from "../components/Loader";


const Job = () => {
  const { id } = useParams();

  const { data: job, isLoading, error } = useGetJob(id || "");

  return (
    <div>
      {isLoading ? <Loader /> : null}
      {error && (
        <p className="text-red-500">
          {(error as any)?.response?.data?.message || "Something went wrong"}
        </p>
      )}
      <h2>Title: {job?.title}</h2>
      <h3>Company: {job?.company}</h3>
      <p>Description: {job?.description}</p>
      <p>Location: {job?.location}</p>
      <p>
        {" "}
        💰 {job?.salary?.currency} {job?.salary?.min.toLocaleString()} -{" "}
        {job?.salary?.max.toLocaleString()}
      </p>
    </div>
  );
}

export default Job
