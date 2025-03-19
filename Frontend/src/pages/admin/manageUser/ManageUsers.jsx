import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, unverifyUser, deleteUser, verifyUser } from "./userApi.js";

import CreateStudentModal from "./cratenewStudent.jsx";
import CreateTeacherAdminModal from "./createTeacher_adminModal.jsx";
import ConfirmActionModal from "./confirmActionModal.jsx";

import {formatName} from '../../../utils/formatName.js'

import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  ButtonGroup, 
  TextField, 
  CircularProgress, 
  SpeedDial, 
  SpeedDialAction 
} from "@mui/material";


const ManageUsers = () => {
  const [filter, setFilter] = useState("verified"); // "all", "verified", "unverified"
  const [search, setSearch] = useState("");
  // Modal State
  const [openModal, setOpenModal] = useState(null); // "student", "teacher_admin"
  const [openCustomModal, setOpenCustomModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for actions

  const queryClient = useQueryClient();
  // Fetch users with TanStack Query
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading users.</p>;

  const handleUnverifyUser = (userId) => {
    setSelectedUser(userId);
    setOpenCustomModal("unverify");
  };

  const handleDeleteUser = (userId) => {
    setSelectedUser(userId);
    setOpenCustomModal("delete");
  };
  
  const handleVerifyUser = (userId) => {
    setSelectedUser(userId);
    setOpenCustomModal("verify");
  };

  // Filter users based on verification status
  const filteredUsers = users
    .filter(user => {
      if (filter === "verified") return user.is_verified;
      if (filter === "unverified") return !user.is_verified;
      return true; // "all" case
    })
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Paper sx={{ padding: 2, overflow: "hidden" }}>
      {/* Buttons for Filtering */}
      <ButtonGroup variant="contained" sx={{ mb: 1 }}>
        <Button 
          onClick={() => setFilter("verified")} 
          sx={{ backgroundColor: filter === "verified" ? "primary.main" : "grey.500" }}
        >
          Verified
        </Button>
        <Button 
          onClick={() => setFilter("unverified")} 
          sx={{ backgroundColor: filter === "unverified" ? "primary.main" : "grey.500" }}
        >
          Unverified
        </Button>
      </ButtonGroup>

      {/* Search Bar */}
      <TextField 
        label="Search Users" 
        variant="outlined" 
        fullWidth 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Scrollable Table */}
      <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.user_id}>
                <TableCell>{formatName(user.name)}</TableCell>
                <TableCell>{formatName(user.username)}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {filter !== "verified" && (
                  <Button variant="contained" color="primary" size="small"
                    onClick={
                      filter === "verified" ? 
                      () => console.log("Edit")
                      :
                      () => handleVerifyUser(user.user_id) 
                    }
                    >
                    { filter === 'verified' ? 'Edit' : 'Verify' }
                  </Button>)}
                  <Button 
                    variant="contained" 
                    color="error" 
                    size="small" 
                    sx={{ ml: 1 }}
                    onClick={ 
                      filter === 'verified' ? 
                      () => handleUnverifyUser(user.user_id) 
                      : 
                      () => handleDeleteUser(user.user_id)}
                  >
                    {filter === 'verified' ? 'unverify':'Delete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* SpeedDial Floating Button */}
      <SpeedDial
        ariaLabel="Add User"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        icon={<AddIcon />}
      >
        <SpeedDialAction
          icon={<SchoolIcon />}
          tooltipTitle="Create Student"
          onClick={() => setOpenModal("student")}
        />
        <SpeedDialAction
          icon={<PersonAddIcon />}
          tooltipTitle="Create Teacher/Admin"
          onClick={() => setOpenModal("teacher_admin")}
        />
      </SpeedDial>

      {/* Student Creation Modal */}
      {openModal === "student" && (
        <CreateStudentModal
          open={true}
          onClose={() => setOpenModal(null)}
          title="Create Student"
          onConfirm={() => console.log("Student Created")}
        />
      )}

      {/* Teacher/Admin Creation Modal */}
      {openModal === "teacher_admin" && (
        <CreateTeacherAdminModal
          open={true}
          onClose={() => setOpenModal(null)}
          title="Create Teacher/Admin"
        />
      )}

      {/* Unverify User Modal */}
      {openCustomModal === "unverify" && (
        <ConfirmActionModal
          open={openCustomModal === "unverify"}
          onClose={() => setOpenCustomModal(null)}
          mutationFn={() => unverifyUser(selectedUser)}
          title="Unverify User" 
          message="Are you sure you want to unverify this user?" 
          actionText="Unverify" 
          confirmColor="warning"
          onSuccessCallback={() => {
            queryClient.setQueryData(["users"], (oldUsers) => 
              oldUsers.map((user) =>
                user.user_id === selectedUser ? { ...user, is_verified: false } : user
              )
            );
          }}
        />
      )}

      {/* Delete User Modal */}
      {openCustomModal === "delete" && (
        <ConfirmActionModal
          open={openCustomModal === "delete"}
          onClose={() => setOpenCustomModal(null)}
          mutationFn={() => deleteUser(selectedUser)}
          title="Delete User" 
          message="Are you sure you want to delete this user?" 
          actionText="Delete" 
          confirmColor="error"
          onSuccessCallback={() => {
            queryClient.setQueryData(["users"], (oldUsers) => 
              oldUsers.filter((user) => user.user_id !== selectedUser)
            );
          }}
        />
      )}

      {/* Verify User Modal */}
      {openCustomModal === "verify" && (
        <ConfirmActionModal
          open={openCustomModal === "verify"}
          onClose={() => setOpenCustomModal(null)}
          mutationFn={() => verifyUser(selectedUser)}
          title="Verify User" 
          message="Are you sure you want to verify this user?" 
          actionText="Verify" 
          confirmColor="success"
          onSuccessCallback={() => {
            queryClient.setQueryData(["users"], (oldUsers) => 
              oldUsers.map((user) =>
                user.user_id === selectedUser ? { ...user, is_verified: true } : user
              )
            );
          }}
          color="primary"
        />
      )}
    </Paper>
  );
};

export default ManageUsers;
