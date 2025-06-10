import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // Using shadcn Form
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { toast } from "sonner";

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }).optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
  if (data.newPassword && !data.confirmPassword) return false; // if new pass, confirm must exist
  if (data.newPassword && data.newPassword !== data.confirmPassword) return false; // passwords must match
  return true;
}, {
  message: "New passwords must match.",
  path: ["confirmPassword"],
});

const notificationSchema = z.object({
  emailNewOrder: z.boolean().default(false),
  emailShipmentUpdate: z.boolean().default(false),
  emailPromotions: z.boolean().default(true),
  smsLowStock: z.boolean().default(false),
});

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Admin User",
      email: "admin@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const notificationsForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNewOrder: true,
      emailShipmentUpdate: true,
      emailPromotions: false,
      smsLowStock: true,
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    console.log("Profile settings submitted:", values);
    toast.success("Profile updated successfully!");
  }

  function onNotificationsSubmit(values: z.infer<typeof notificationSchema>) {
    console.log("Notification settings submitted:", values);
    toast.success("Notification preferences saved!");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 h-20 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
          <NavigationMenu>
            <NavigationMenuList>
              {/* Settings page specific nav if any */}
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <main className="flex-grow p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal account information and password.</CardDescription>
                </CardHeader>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                    <CardContent className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2 pt-4 border-t">
                        <h3 className="text-md font-medium">Change Password</h3>
                         <FormField
                            control={profileForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="Enter current password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={profileForm.control}
                            name="newPassword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="Enter new password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={profileForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="Confirm new password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Profile</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive alerts and updates.</CardDescription>
                </CardHeader>
                 <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}>
                    <CardContent className="space-y-6">
                      <FormField
                        control={notificationsForm.control}
                        name="emailNewOrder"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">New Order Emails</FormLabel>
                              <p className="text-sm text-muted-foreground">Receive an email for every new order placed.</p>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={notificationsForm.control}
                        name="emailShipmentUpdate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Shipment Updates</FormLabel>
                              <p className="text-sm text-muted-foreground">Get notified when order shipment status changes.</p>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="emailPromotions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Promotional Emails</FormLabel>
                              <p className="text-sm text-muted-foreground">Receive marketing and promotional emails.</p>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationsForm.control}
                        name="smsLowStock"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Low Stock SMS Alerts</FormLabel>
                              <p className="text-sm text-muted-foreground">Receive SMS alerts for products running low on stock.</p>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Preferences</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="application">
              <Card>
                <CardHeader>
                  <CardTitle>Application Settings</CardTitle>
                  <CardDescription>Manage general application preferences (e.g., theme, language, API keys).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-theme">Application Theme</Label>
                    {/* Placeholder for theme switcher */}
                    <Button variant="outline">Toggle Dark Mode</Button> 
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key Management</Label>
                    <Input id="api-key" placeholder="Enter new API key..." />
                    <Button variant="secondary">Generate New Key</Button>
                  </div>
                  {/* More settings can be added here */}
                </CardContent>
                <CardFooter>
                  <Button>Save Application Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;