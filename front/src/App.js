import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageDetailProvider } from './ContextAPI/PageDetailContext';
import { UserProvider } from './ContextAPI/UserTokenContext_API';
import { AddToCartProvider } from './ContextAPI/AddToCartContext';
import './App.css';
import DashboardLayout from './Dashboard/Components/Layouts/Dashboard';
import DashBoard from './Dashboard/Components/Pages/Index';
import Allbooks from './Dashboard/Components/Pages/Books/Allbooks';
import Allcategories from './Dashboard/Components/Pages/Categories/AllCategories';
import AddBook from './Dashboard/Components/Pages/Books/AddBook';
import AddCategory from './Dashboard/Components/Pages/Categories/AddCategory';
import EditBook from './Dashboard/Components/Pages/Books/EditBook';
import EditCategory from './Dashboard/Components/Pages/Categories/EditCategory';
import Auth from './Dashboard/Components/Layouts/Auth';
import LoginPage from './Auth/LoginPage';
import AuthGuard from './Dashboard/Components/Guard/Index';
import FrontendLayout from './Frontend/Components/Layout/Frontend';
import HomePage from './Frontend/Components/Pages/Home';
import ProductPage from './Frontend/Components/Pages/Home/Product/Index';
import CartPage from './Frontend/Components/Pages/Cart/CartPage';
import ContactUsPage from './Frontend/Components/Pages/ContactUs/IndexContact';
import AboutPage from './Frontend/Components/Pages/AboutUs/IndexAbout';
import CheckOut from './Frontend/Components/Pages/Cart/CheckOut';
import MessageList from './Dashboard/Components/Pages/Mailbox/Message';
import ThankYouPage from './Frontend/Components/Pages/Cart/ThankYouPage';
import OrderPageLayout from './Dashboard/Components/Pages/Order/Index';
import OrderDetailPage from './Dashboard/Components/Pages/Order/OrderIndex';
import OrderProducts from './Dashboard/Components/Pages/Order/OrderProducts';
import UserPage from './Dashboard/Components/Pages/Users/UserDetail';
import PageNotFound from './Dashboard/Components/Pages/PageNotFound';


function App() {
  return (
    <div>
      <UserProvider>
        <PageDetailProvider>
          <AddToCartProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/auth' element={<Auth />}>
                  <Route path='login' element={<LoginPage />}></Route>
                </Route>

                <Route path='/' element={<FrontendLayout />}>
                  <Route index element={<HomePage />}></Route>
                  <Route path='about' element={<AboutPage />}></Route>
                  <Route path='contact' element={<ContactUsPage />}></Route>
                  <Route path='products' element={<ProductPage />}></Route>
                  <Route path='cart' element={<CartPage />}></Route>
                  <Route path='checkout' element={<CheckOut />}></Route>
                  <Route path='order-success' element={<ThankYouPage />}></Route>
                </Route>

                <Route element={<AuthGuard />}>
                  <Route path='/dashboard' element={<DashboardLayout />}>
                    <Route index element={<DashBoard />}></Route>
                    <Route path='books' element={<Allbooks />}></Route>
                    <Route path='books/edit/:id' element={<EditBook />}></Route>
                    <Route path='books/addbook' element={<AddBook />}></Route>

                    <Route path='userprofile' element={<UserPage/>}></Route>

                    <Route path='categories' element={<Allcategories />}></Route>
                    <Route path='categories/addcategory' element={<AddCategory />}></Route>
                    <Route path='categories/edit/:id' element={<EditCategory />}></Route>

                    <Route path='inbox' element={<MessageList />}></Route>

                    <Route path='orders' element={<OrderPageLayout />}>
                      <Route index element={<OrderDetailPage />}></Route>
                      <Route path=':id' element={<OrderProducts />}></Route>
                    </Route>

                  </Route>

                  <Route path='*' element={<PageNotFound/>}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </AddToCartProvider>
        </PageDetailProvider>
      </UserProvider>
    </div>
  );
}

export default App;
