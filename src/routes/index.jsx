import { lazy, Suspense } from "react"
import { AuthRoute } from "@/components/AuthRoute"
import Layouts from "@/pages/Layouts"
import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"
// import Home from "@/pages/Home"
// const NotFound = lazy(() => import("@/pages/NotFound"))
// const Login = lazy(() => import("@/pages/Login"))
const Home = lazy(() => import("@/pages/Home"))
const Article = lazy(() => import("@/pages/Article"))
const Publish = lazy(() => import("@/pages/Publish"))

const lazyComponent = (element) => <Suspense fallback={<div style={{ paddingTop: '14px', display: "flex", alignItems: 'center', justifyContent: 'center' }}>🌀 Loading...</div>}><AuthRoute>{element}</AuthRoute></Suspense>
const routes = [
  {
    path: "/",
    element: <Layouts />,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        // index: true,
        element: lazyComponent(<Home></Home>)
      },
      {
        path: "/article",
        name: "article",
        element: lazyComponent(<Article></Article>)
      },
      {
        path: "/publish",
        name: "publish",
        element: lazyComponent(<Publish></Publish>)
      }
    ]
  },

  {
    path: "/login",
    name: "login", // <Suspense fallback={<div style={{ paddingTop: '14px', display: "flex", alignItems: 'center', justifyContent: 'center' }}>🌀 Loading...</div>}><Login /></Suspense>
    element: <Login />
  },

  {
    name: "notFound",
    path: "*",
    key: "404", // <Suspense fallback={<div style={{ paddingTop: '14px', display: "flex", alignItems: 'center', justifyContent: 'center'}}>🌀 Loading...</div>}><NotFound /></Suspense>
    element: <NotFound />
  }
]

export default routes