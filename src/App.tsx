import { Route, Routes } from 'react-router-dom'
// import MainPage from './pages/MainPage/ui/MainPage'
// import RecipeDetailsPage from './pages/RecipeDetailsPage/ui/RecipeDetailsPage'
import { MainPage } from './pages/MainPage'
import { RecipeDetailsPage } from './pages/RecipeDetailsPage'
import { Suspense } from 'react'

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipes" element={<MainPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
