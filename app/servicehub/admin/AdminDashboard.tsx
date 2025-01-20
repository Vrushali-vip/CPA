"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import pb, { getImageUrl } from "@/lib/pocketbase";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import FileInput from "@/components/custom/FileInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { UserListItemForAdmin, UserRole } from "../types";

const baseSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  sub: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  description: z.string().min(2, { message: "Description must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  passwordConfirm: z.string().min(6, { message: "Confirm Password must be at least 6 characters" }),
  oldPassword: z.string().optional(),
  role: z.string().nonempty({ message: "Please select a role" }),
  avatar: z.any().optional(),
});

const createUserSchema = baseSchema
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], 
  });

const updateUserSchema = baseSchema
  .omit({ role: true, password: true, passwordConfirm: true })
  .extend({
    oldPassword: z.string().min(1, { message: "Current password is required to update user" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
    passwordConfirm: z.string().min(6, { message: "Confirm Password must be at least 6 characters" }).optional(),
  })
  .refine((data) => {
    if (data.password) {
      return data.password === data.passwordConfirm;
    }
    return true;
  }, {
    message: "Passwords must match",
    path: ["passwordConfirm"], 
  });

type UserManagementProps = {
  initialUsers: UserListItemForAdmin[];
};

export default function UserManagement({ initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState(initialUsers);
  const [nameFilter, setNameFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState<UserListItemForAdmin | null>(null);

  const filteredUsers = users.filter((user) => {
    const nameMatch = nameFilter 
      ? user.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    
    const roleMatch = roleFilter === 'ALL' 
      ? true 
      : user.role === roleFilter;
    
    return nameMatch && roleMatch;
  });

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(isEditMode ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      sub: "",
      description: "",
      password: "",
      passwordConfirm: "",
      oldPassword: "",
      role: "",
      avatar: null,
    },
  });

  useEffect(() => {
    loadAdminData();
  },);

  useEffect(() => {
    form.reset();
    form.clearErrors();
  }, [form, isEditMode]);

  const loadAdminData = useCallback(async () => {
    try {
      const users = await pb.collection("users").getFullList({
        fields: "id,name,email,role,avatar",
        sort: "name",
      });

      setUsers(users as unknown as UserListItemForAdmin[]);
    } catch (error) {
      console.error("Failed to load admin data", error);
    }
  },[]);

  users.sort((a, b) => a.name.localeCompare(b.name));

  const handleDeleteUser = useCallback(async (userId: string) => {
    try {
      await pb.collection("users").delete(userId);
      await loadAdminData();
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully removed.",
      });
    } catch (error) {
      console.error("Failed to delete user", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  }, [loadAdminData, toast]);

  const handleEditUser = (user: UserListItemForAdmin) => {
    setEditingUser(user);
    setIsEditMode(true);
    setDialogOpen(true);

    form.setValue('name', user.name);
    form.setValue('email', user.email);
    form.setValue('role', user.role);
  };

  const getAvatarUrl = (user: UserListItemForAdmin) => {
    return getImageUrl("users", user.id, user.avatar)
  };

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    const fd = new FormData();
    fd.append("name", values.name);
    fd.append("email", values.email);
    fd.append("sub", values.sub);
    fd.append("description", values.description);
    
    if (isEditMode && editingUser) {
      try {
        if (values.password) {
          fd.append("password", values.password);
          fd.append("passwordConfirm", values.passwordConfirm);
          fd.append("oldPassword", values.oldPassword || "");
        }
        
        await pb.collection("users").update(editingUser.id, fd);
        
        toast({
          title: "Success",
          description: "User updated successfully.",
        });
        
        form.reset();
        setDialogOpen(false);
        setIsEditMode(false);
        setEditingUser(null);
        await loadAdminData();
      } catch (error) {
        console.error("An unexpected error occurred", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    } else {
      try {
        fd.append("password", values.password);
        fd.append("passwordConfirm", values.passwordConfirm);
        fd.append("role", values.role);
        if (avatar) fd.append("avatar", avatar);

        const response = await fetch("/api/users", {
          method: "POST",
          body: fd,
        });

        if (!response.ok) {
          const errorResponse = await response.json().catch(() => ({ error: "Unknown error occurred" }));
          throw new Error(errorResponse.error || "Failed to create user");
        }

        await response.json();
        toast({
          title: "Success",
          description: "User created successfully.",
        });
        form.reset();
        setAvatar(null);
        setDialogOpen(false);
        
        await loadAdminData();
      } catch (error) {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        {/* Search and Filter Section */}
        <div className="flex space-x-2 items-center mb-4">
          <Input
            placeholder="Search by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="flex-grow"
          />
          <Select 
            value={roleFilter} 
            onValueChange={(value: UserRole | 'ALL') => setRoleFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="SUPPORT">Support</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={() => {
              setNameFilter('');
              setRoleFilter('ALL');
            }}
          >
            Clear
          </Button>

          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              form.reset();
              setIsEditMode(false);
              setEditingUser(null);
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2" size={16} /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormItem>
                    <FormLabel>Profile Picture (Optional)</FormLabel>
                    <FileInput
                      onChange={(files) => setAvatar(files[0] || null)}
                      label="Upload Avatar"
                      accept="image/*"
                      multiple={false}
                    />
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter full name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Enter email address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sub"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isEditMode && (
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="Enter current password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isEditMode ? "New Password" : "Enter Password"}</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder={isEditMode ? "Leave blank to keep existing" : "Enter password"} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isEditMode ? "Confirm New Password" : "Confirm Password"}</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Re-enter password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!isEditMode && (
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SUPPORT">Support</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="CUSTOMER">Customer</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button type="submit" className="w-full mt-2">
                    {isEditMode ? "Update User" : "Create User"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Grid */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Existing Users</h2>
          
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="border p-4 rounded-md flex flex-col items-center text-center"
                >
                  <img 
                    src={user.avatar ? getAvatarUrl(user) : '/img.jpg'} 
                    alt={`avatar`} 
                    className="w-20 h-20 rounded-full mb-3 object-cover"
                  />
                  <div>
                    <p className="font-medium mt-2">{user.name}</p>
                    <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                    <p className="text-xs bg-gray-500 text-white rounded px-2 py-1 inline-block mb-3">
                      {user.role}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleEditUser(user)}
                      className="flex items-center space-x-1"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </Button>
                    <Button 
                      onClick={() => handleDeleteUser(user.id)}
                      variant="destructive"
                      className="flex items-center space-x-1"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





