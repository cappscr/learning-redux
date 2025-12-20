import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { Navbar } from './components/Navbar'
import { LoginPage } from './features/auth/LoginPage'
import { PostsMainPage } from './features/posts/PostsMainPage'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UserList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'

import { selectCurrentUsername } from './features/auth/authSlice'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
