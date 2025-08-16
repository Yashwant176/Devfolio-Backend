import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getUsername, signin } from "@/services/apiBlog";
import { toast } from "react-toastify";
import SmallSpinner from "@/ui_components/SmallSpinner";

const LoginPage = ({setIsAuthenticated, setUsername}) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const location = useLocation()
  const navigate = useNavigate()

  const mutation = useMutation({
  mutationFn: (data) => signin(data),
  onSuccess: async (response) => {
    localStorage.setItem("access", response.access);
    localStorage.setItem("refresh", response.refresh);
    setIsAuthenticated(true);

    try {
      const res = await getUsername(); // wait for API response
      setUsername(res.username);
      toast.success(`Hi, ${res.username}! You have successfully signed in.`);
    } catch (err) {
      toast.error("Could not fetch username");
    }

    const from = location?.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  },
  onError: (err) => {
    toast.error(err.message);
  },
});


  function onSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 
    items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl 
    dark:text-white dark:bg-[#141624]"
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">Signin Form</h3>
        <p>Welcome back! Log in to continue.</p>
      </div>

      <div>
        <Label htmlFor="username" className="dark:text-[97989F]">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          disabled={mutation.isPending}
          placeholder="Enter username"
          {...register("username", { required: "Username is required" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <small className="text-red-700">{errors.username.message}</small>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          disabled={mutation.isPending}
          placeholder="Enter password"
          {...register("password", { required: "Password is required" })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px]  w-[300px]"
        />
        {errors?.password?.message && (
          <small className="text-red-700">{errors.password.message}</small>
        )}
      </div>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button disabled={mutation.isPending} className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
          {mutation.isPending ? (
            <>
              {" "}
              <SmallSpinner />{" "}
              <small className="text-[16px]">Signing up...</small>{" "}
            </>
          ) : (
            <small className="text-[16px]">Signin</small>
          )}
        </button>
        <p className="text-[14px]">
          Don't have an account? <Link to="/signup">signup</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;