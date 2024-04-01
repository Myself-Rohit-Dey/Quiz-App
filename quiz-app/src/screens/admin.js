import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Title from '../components/title';
import ManageUsers from '../components/manageUsers';
import Dashboard from '../components/dashboard';
import ManageQuestions from '../components/manageQuestions';
import Icon from "react-native-vector-icons/Ionicons";
const Admin = ({navigation}) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  // const [activeSection,setActiveSection]= useState('')

  const menuItems = [
    { id: 'Dashboard', title: 'Dashboard' },
    { id: 'Users', title: 'Users' },
    { id: 'Questions', title: 'Questions' },
    // Add more menu items as needed
  ];

  const handleMenuItemClick = (menuItem) => {
    // Handle menu item click based on the selected functionality
    setSelectedMenuItem(menuItem);
    console.log('Clicked on:', menuItem);
  };

  // Define content for different menu items
  const renderMainContent = () => {
    switch (selectedMenuItem) {
      case 'Users':
        return <ManageUsers/>;
      case 'Questions':
        return <ManageQuestions/>;
      default:
        return <Dashboard/>;
    }
  };
  // const renderSection = () => {
  //       switch (activeSection) {
  //         case "Profile":
  //         //   return <ProfileSection />;
  //         // case "Settings":
  //         //   return <SettingsSection />;
  //         case "Analytics":
  //           return <AnalyticsSection />;
  //         case "Messages":
  //           return <MessagesSection />;
  //         // case "Tasks":
  //         //   return <TasksSection />;
  //         // case "Calendar":
  //         //   return <CalendarSection />;
  //         default:
  //           return <HomeSection />;
  //       }
  //     };

  // const Dashboard = () => (
  //       <View style={styles.container}>
  //         <View style={styles.headerContainer}>
  //           {/* {renderBackButton()} */}
  //           <Text style={styles.h1}>WELCOME Admin</Text>
  //           {/* <Text style={styles.headerTitle}>Profile Section</Text> */}
  //         </View>
  //         <View style={styles.contentContainer}>
  //           {/* <Icon name="person" size={80} color="#3498db" /> */}
  //           <Text style={styles.contentText}>Username: {user.first_name} {user.last_name}</Text>
  //           <Text style={styles.contentText}>Email: {user.email}</Text>
  //         </View>
  //         {/* <View style={styles.buttonsContainer}>
  //         <TouchableOpacity
  //           onPress={() => setActiveSection("Profile")}
  //           style={styles.button}
  //         >
  //           <Icon name="person" size={30} color="white" />
  //           <Text style={styles.buttonText}>Profile</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={() => setActiveSection("Settings")}
  //           style={styles.button}
  //         >
  //           <Icon name="settings" size={30} color="white" />
  //           <Text style={styles.buttonText}>Settings</Text>
  //         </TouchableOpacity>
  //       </View> */}
  //       <View style={styles.featuresContainer}>
  //       <PressableFeatureBox
  //         name="Analytics"
  //         icon="stats-chart"
  //         onPress={() => setActiveSection("Analytics")}
  //       />
  //       <PressableFeatureBox
  //         name="Messages"
  //         icon="chatbox"
  //         onPress={() => setActiveSection("Messages")}
  //       />
  //     </View>
  //       </View>
  // );
  // const PressableFeatureBox = ({ name, icon, onPress }) => (
  //   <TouchableOpacity onPress={onPress} style={styles.featureBox}>
  //     <Icon name={icon} size={50} color="#3498db" />
  //     <Text style={styles.featureName}>{name}</Text>
  //   </TouchableOpacity>
  // );

  // const AnalyticsSection = () => (
  //   <View style={styles.container}>
  //     <View style={styles.headerContainer}>
  //       {/* {renderBackButton()} */}
  //       <Text style={styles.headerTitle}>Analytics Section</Text>
  //     </View>
  //     <View style={styles.contentContainer}>
  //       <Text style={styles.contentText}>Analytics Content Goes Here</Text>
  //     </View>
  //   </View>
  // );

  // const MessagesSection = () => (
  //   <View style={styles.container}>
  //     <View style={styles.headerContainer}>
  //       {/* {renderBackButton()} */}
  //       <Text style={styles.headerTitle}>Messages Section</Text>
  //     </View>
  //     <View style={styles.contentContainer}>
  //       <Text style={styles.contentText}>Messages Content Goes Here</Text>
  //     </View>
  //   </View>
  // );


  // const Users = () => {
  //   const [users, setUsers] = useState([]);
  
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await fetch('https://7406-2402-3a80-196b-fc9b-44eb-26a5-afab-83ef.ngrok-free.app/users');
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch users');
  //         }
  //         const userData = await response.json();
  //         setUsers(userData.users);
  //       } catch (error) {
  //         console.error('Error fetching users:', error.message);
  //       }
  //     };
  
  //     fetchUsers();
  //   }, []); // Empty dependency array ensures the effect runs only once
  
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.header}>User List</Text>
  //       <View style={styles.userList}>
  //         {users.map(user => (
  //           <View key={user.id} style={styles.userItem}>
  //             <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
  //             <Text style={styles.userEmail}>{user.email}</Text>
  //           </View>
  //         ))}
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <View style={styles.container}>
      <Title />
      {/* Sidebar navigation menu */}
      <View style={styles.sidebar}>
        <View style={styles.flatlistContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="chevron-back-circle-outline" size={28} color="black" style={{ margin:10 }} />
          </TouchableOpacity>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                selectedMenuItem === item.id ? styles.selectedMenuItem : null,
              ]}
              onPress={() => handleMenuItemClick(item.id)}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Main content area */}
      <ScrollView>
      <View style={styles.mainContent}>
        {/* Display content based on selected menu item */}
        {renderMainContent()}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
    // paddingTop
  },
  sidebar: {
    // backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the TouchableOpacity horizontally
    flexDirection: 'row',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedMenuItem: {
    backgroundColor: '#ddd',
    borderRadius: 10
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mainContent: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff', // Example background color
  },
  

        
});

export default Admin;


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useContext } from "react";
// import { useAuth } from "../context/authContext";

// const DashboardApp = () => {
//   const [activeSection, setActiveSection] = useState("Home");
//   const {user} = useAuth();
//   useEffect (() => {
//     console.log(user.first_name);
//   })

//   const renderSection = () => {
//     switch (activeSection) {
//       case "Profile":
//         return <ProfileSection />;
//       case "Settings":
//         return <SettingsSection />;
//       case "Analytics":
//         return <AnalyticsSection />;
//       case "Messages":
//         return <MessagesSection />;
//       case "Tasks":
//         return <TasksSection />;
//       case "Calendar":
//         return <CalendarSection />;
//       default:
//         return <HomeSection />;
//     }
//   };

//   const renderBackButton = () => (
//     <TouchableOpacity
//       onPress={() => setActiveSection("Home")}
//       style={styles.backButton}
//     >
//       <Icon name="arrow-back" size={30} color="#000000" />
//       <Text style={styles.backButtonText}>Back to Home</Text>
//     </TouchableOpacity>
//   );

//   const HomeSection = () => (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Welcome to the Dashboard!</Text>
        // <View style={styles.buttonsContainer}>
        //   <TouchableOpacity
        //     onPress={() => setActiveSection("Profile")}
        //     style={styles.button}
        //   >
        //     <Icon name="person" size={30} color="white" />
        //     <Text style={styles.buttonText}>Profile</Text>
        //   </TouchableOpacity>
        //   <TouchableOpacity
        //     onPress={() => setActiveSection("Settings")}
        //     style={styles.button}
        //   >
        //     <Icon name="settings" size={30} color="white" />
        //     <Text style={styles.buttonText}>Settings</Text>
        //   </TouchableOpacity>
        // </View>
//       </View>
      // <View style={styles.featuresContainer}>
      //   <PressableFeatureBox
      //     name="Analytics"
      //     icon="stats-chart"
      //     onPress={() => setActiveSection("Analytics")}
      //   />
      //   <PressableFeatureBox
      //     name="Messages"
      //     icon="chatbox"
      //     onPress={() => setActiveSection("Messages")}
      //   />
      //   <PressableFeatureBox
      //     name="Tasks"
      //     icon="checkbox-outline"
      //     onPress={() => setActiveSection("Tasks")}
      //   />
      //   <PressableFeatureBox
      //     name="Calendar"
      //     icon="calendar"
      //     onPress={() => setActiveSection("Calendar")}
      //   />
      // </View>
//     </View>
//   );
//   const ProfileSection = () => (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         {renderBackButton()}
//         <Text style={styles.headerTitle}>Profile Section</Text>
//       </View>
//       <View style={styles.contentContainer}>
//         <Icon name="person" size={80} color="#3498db" />
//         <Text style={styles.contentText}>Username: {user.first_name} {user.last_name}</Text>
//         <Text style={styles.contentText}>Email: {user.email}</Text>
//       </View>
//     </View>
//   );

//   const SettingsSection = () => (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         {renderBackButton()}
//         <Text style={styles.headerTitle}>Settings Section</Text>
//       </View>
//       <View style={styles.contentContainer}>
//         <Icon name="settings" size={80} color="#3498db" />
//         <Text style={styles.contentText}>Notifications: On</Text>
//         <Text style={styles.contentText}>Theme: Light</Text>
//       </View>
//     </View>
//   );

  // const PressableFeatureBox = ({ name, icon, onPress }) => (
  //   <TouchableOpacity onPress={onPress} style={styles.featureBox}>
  //     <Icon name={icon} size={50} color="#3498db" />
  //     <Text style={styles.featureName}>{name}</Text>
  //   </TouchableOpacity>
  // );

  // const AnalyticsSection = () => (
  //   <View style={styles.container}>
  //     <View style={styles.headerContainer}>
  //       {renderBackButton()}
  //       <Text style={styles.headerTitle}>Analytics Section</Text>
  //     </View>
  //     <View style={styles.contentContainer}>
  //       <Text style={styles.contentText}>Analytics Content Goes Here</Text>
  //     </View>
  //   </View>
  // );

  // const MessagesSection = () => (
  //   <View style={styles.container}>
  //     <View style={styles.headerContainer}>
  //       {renderBackButton()}
  //       <Text style={styles.headerTitle}>Messages Section</Text>
  //     </View>
  //     <View style={styles.contentContainer}>
  //       <Text style={styles.contentText}>Messages Content Goes Here</Text>
  //     </View>
  //   </View>
  // );

//   const TasksSection = () => (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         {renderBackButton()}
//         <Text style={styles.headerTitle}>Tasks Section</Text>
//       </View>
//       <View style={styles.contentContainer}>
//         <Text style={styles.contentTitle}>Upcoming Tasks</Text>
//         <TaskItem title="Task 1" description="Geekforgeeks contest." />
//         <TaskItem title="Task 2" description="mock interview" />
//         <TaskItem title="Task 3" description="Sample paper solution ." />
//       </View>
//     </View>
//   );
//   const CalendarSection = () => (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         {renderBackButton()}
//         <Text style={styles.headerTitle}>Calendar Section</Text>
//       </View>
//       <View style={styles.contentContainer}>
//         <Text style={styles.contentTitle}>Events This Week</Text>
//         <EventItem
//           date="Mon, Jan 10"
//           time="3:00 PM - 5:00 PM"
//           title="Meeting with Team"
//           location="Office Conference Room"
//         />
//         <EventItem
//           date="Thu, Jan 13"
//           time="10:00 AM - 12:00 PM"
//           title="Client Presentation"
//           location="Online"
//         />
//         <EventItem
//           date="Sat, Jan 15"
//           time="6:00 PM - 8:00 PM"
//           title="Dinner with Friends"
//           location="Local Restaurant"
//         />
//       </View>
//     </View>
//   );

//   const TaskItem = ({ title, description }) => (
//     <View style={styles.taskItem}>
//       <Text style={styles.taskTitle}>{title}</Text>
//       <Text style={styles.taskDescription}>{description}</Text>
//     </View>
//   );

//   const EventItem = ({ date, time, title, location }) => (
//     <View style={styles.eventItem}>
//       <View style={styles.eventDateTime}>
//         <Text style={styles.eventDate}>{date}</Text>
//         <Text style={styles.eventTime}>{time}</Text>
//       </View>
//       <Text style={styles.eventTitle}>{title}</Text>
//       <Text style={styles.eventLocation}>{location}</Text>
//     </View>
//   );
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     headerContainer: {
//       backgroundColor: "#3498db",
//       padding: 20,
//       borderBottomLeftRadius: 20,
//       borderBottomRightRadius: 20,
//       elevation: 5,
//     },
//     headerTitle: {
//       fontSize: 24,
//       fontWeight: "bold",
//       color: "white",
//       marginBottom: 20,
//     },
//     buttonsContainer: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//     },
//     button: {
//       flexDirection: "row",
//       alignItems: "center",
//       backgroundColor: "#2ecc71",
//       padding: 10,
//       borderRadius: 5,
//     },
//     buttonText: {
//       color: "white",
//       fontSize: 16,
//       fontWeight: "bold",
//       marginLeft: 10,
//     },
//     featuresContainer: {
//       flex: 1,
//       flexDirection: "row",
//       flexWrap: "wrap",
//       justifyContent: "space-around",
//       marginTop: 20,
//     },
//     featureBox: {
//       alignItems: "center",
//       justifyContent: "center",
//       width: "45%",
//       aspectRatio: 1,
//       backgroundColor: "white",
//       borderRadius: 10,
//       marginVertical: 10,
//       elevation: 5,
//     },
//     featureName: {
//       marginTop: 10,
//       fontSize: 16,
//       fontWeight: "bold",
//       color: "#555",
//     },
//     backButton: {
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     backButtonText: {
//       color: "#3498db",
//       fontSize: 16,
//       marginLeft: 10,
//     },
//     contentContainer: {
//       flex: 1,
//       padding: 20,
//       alignItems: 'center'
//     },
//     contentText: {
//       fontSize: 16,
//       marginBottom: 10,
//       color: "#555",
//     },
//     contentTitle: {
//       fontSize: 20,
//       fontWeight: "bold",
//       color: "#333",
//       marginBottom: 10,
//     },
//     taskItem: {
//       backgroundColor: "#3498db",
//       borderRadius: 10,
//       padding: 15,
//       marginVertical: 10,
//     },
//     taskTitle: {
//       color: "white",
//       fontSize: 18,
//       fontWeight: "bold",
//     },
//     taskDescription: {
//       color: "white",
//       fontSize: 14,
//       marginTop: 5,
//     },
//     eventItem: {
//       backgroundColor: "white",
//       borderRadius: 10,
//       padding: 15,
//       marginVertical: 10,
//       elevation: 5,
//     },
//     eventDateTime: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginBottom: 10,
//     },
//     eventDate: {
//       color: "#3498db",
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//     eventTime: {
//       color: "#555",
//       fontSize: 16,
//     },
//     eventTitle: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "#333",
//     },
//     eventLocation: {
//       fontSize: 14,
//       color: "#777",
//     },
//   });

//   return <View style={styles.container}>{renderSection()}</View>;
// };

// export default DashboardApp;
