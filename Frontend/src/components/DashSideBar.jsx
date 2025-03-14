import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiGift, HiOutlineUserGroup, HiUser, HiTruck, HiArchive, HiBookmark, HiStar } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


export default function DashSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile' key="profile">
            <Sidebar.Item 
              active={tab === 'profile'} 
              icon={HiUser} 
              label={currentUser?.isAdmin ? 'Admin' : 'User'} 
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser?.isAdmin && (
            <>
              <Link to='/dashboard?tab=users' key="users">
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=products' key="products">
                <Sidebar.Item
                  active={tab === 'products'}
                  icon={HiGift}
                  as='div'
                >
                  Products
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=events' key="events">
                <Sidebar.Item
                  active={tab === 'events'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Events
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=staff' key="staff">
                <Sidebar.Item
                  active={tab === 'staff'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Staff members
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=reviews' key="reviews">
                <Sidebar.Item
                  active={tab === 'reviews'}
                  icon={HiStar}
                  as='div'
                >
                  Reviews & Ratings
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=suppliers' key="suppliers">
                <Sidebar.Item
                  active={tab === 'suppliers'}
                  icon={HiGift}
                  as='div'
                >
                  Suppliers
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=orders' key="orders">
                <Sidebar.Item
                  active={tab === 'orders'}
                  icon={HiArchive}
                  as='div'
                >
                  Orders
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=restock' key="restock">
                <Sidebar.Item
                  active={tab === 'restock'}
                  icon={HiBookmark}
                  as='div'
                >
                  Restock
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=delivery' key="delivery">
                <Sidebar.Item
                  active={tab === 'delivery'}
                  icon={HiTruck}
                  as='div'
                >
                  Delivery
                </Sidebar.Item>
              </Link>
             
            </>
          )}

              <Link to='/dashboard?tab=myorders' key="myorders">
                <Sidebar.Item
                  active={tab === 'myorders'}
                  icon={HiGift}
                  as='div'
                >
                  My Orders
                </Sidebar.Item>
              </Link>

          <Sidebar.Item 
            icon={HiArrowSmRight} 
            className="cursor-pointer" 
            onClick={handleSignOut}
            key="signout"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
