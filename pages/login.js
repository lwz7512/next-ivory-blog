import Layout from '../components/layout'
import Container from '../components/container'
import PostTitle from '../components/post-title'


export default function LoginPage() {

  return (
    <Layout>
      <Container>
        <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-sm">
          <div class="py-8 px-8 rounded-xl">
            <h1 class="font-medium text-2xl mt-3 text-center">Login</h1>
            <form action="" class="mt-6">
                <div class="my-5 text-sm">
                    <label for="username" class="block text-black">Username</label>
                    <input type="text" autofocus id="username" class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Username" />
                </div>
                <div class="my-5 text-sm">
                    <label for="password" class="block text-black">Password</label>
                    <input type="password" id="password" class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full" placeholder="Password" />
                    <div class="flex justify-end mt-2 text-xs text-gray-600">
                        <a href="../../pages/auth/forget_password.html hover:text-black">Forget Password?</a>
                    </div>
                </div>

                <button class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full">Login</button>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  )
}