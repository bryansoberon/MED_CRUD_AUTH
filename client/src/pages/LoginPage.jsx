import { useForm } from 'react-hook-form'

function LoginPage(){
    const {
        register, 
        handleSubmit,
        formState :{ errors } } = useForm();

    const onSubmit = handleSubmit(data =>{
        console.log(data);
    });
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div calssName='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl font-bold mb-3'>Login</h1>
                <form onSubmit={onSubmit}
                className='flex flex-col'
                >
                <input 
                    type="email" {...register('email', {required: true})} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='Email' />

                    {errors.email && (
                        <p className='text-red-500'>Email is required</p>
                    )}
                <input 
                    type="password" {...register('password', {required: true})} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='Password'/>

                    {errors.password && (
                        <p className='text-red-500'>Password is required</p>
                    )}
                    
                <button type='submit'>
                    Login
                </button>
                </form>
            </div>
        </div>
    )
    
}

export default LoginPage