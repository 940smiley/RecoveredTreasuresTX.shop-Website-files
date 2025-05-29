"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Sparkles,
  Lock,
  Unlock,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { AdminUploadZone } from '@/components/admin/admin-upload-zone'
import { AdminProductGrid } from '@/components/admin/admin-product-grid'
import { AdminAnalytics } from '@/components/admin/admin-analytics'
import { AICodeGenerator } from '@/components/admin/ai-code-generator'

// Type definitions
interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardStats {
  totalItems: number;
  categories: number;
  aiProcessed: number;
  featured: number;
}

interface ActivityItem {
  id: string;
  type: 'upload' | 'ai' | 'edit' | 'delete';
  title: string;
  description: string;
  timeAgo: string;
}

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  // Check for existing session on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for cookies
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Failed to check authentication status', err);
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include', // Important for cookies
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setError(data.message || 'Authentication failed');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Enter your admin credentials to access the management panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Unlock className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Management</h1>
                <p className="text-gray-600">Recollected Treasures TX</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'upload', label: 'Upload', icon: Upload },
              { id: 'ai-tools', label: 'AI Tools', icon: Sparkles },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((tab: TabItem) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'inventory' && <InventoryContent />}
        {activeTab === 'upload' && <UploadContent />}
        {activeTab === 'ai-tools' && <AIToolsContent />}
        {activeTab === 'analytics' && <AnalyticsContent />}
      </div>
    </div>
  )
}

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    categories: 0,
    aiProcessed: 0,
    featured: 0
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch dashboard stats
        const statsResponse = await fetch('/api/admin/dashboard-stats');
        
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch dashboard statistics');
        }
        
        const statsData = await statsResponse.json();
        setStats(statsData);
        
        // Fetch recent activity
        const activityResponse = await fetch('/api/admin/recent-activity');
        
        if (!activityResponse.ok) {
          throw new Error('Failed to fetch recent activity');
        }
        
        const activityData = await activityResponse.json();
        setActivities(activityData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-6 h-6 mt-0.5" />
        <div>
          <h3 className="font-bold text-lg">Error Loading Dashboard</h3>
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold">{stats.totalItems.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold">{stats.categories}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Processed</p>
                <p className="text-3xl font-bold">{stats.aiProcessed}%</p>
              </div>
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-3xl font-bold">{stats.featured}</p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No recent activity found</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => {
                  // Determine icon based on activity type
                  let Icon = Upload;
                  let bgColor = 'bg-blue-100';
                  let iconColor = 'text-blue-600';
                  
                  if (activity.type === 'ai') {
                    Icon = Sparkles;
                    bgColor = 'bg-green-100';
                    iconColor = 'text-green-600';
                  } else if (activity.type === 'edit') {
                    Icon = Edit;
                    bgColor = 'bg-yellow-100';
                    iconColor = 'text-yellow-600';
                  } else if (activity.type === 'delete') {
                    Icon = Trash2;
                    bgColor = 'bg-red-100';
                    iconColor = 'text-red-600';
                  }
                  
                  return (
                    <div key={activity.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <Badge variant="secondary">{activity.timeAgo}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex-col gap-2">
                <Upload className="w-6 h-6" />
                Bulk Upload
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Sparkles className="w-6 h-6" />
                AI Process
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="w-6 h-6" />
                Add Item
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InventoryContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>
      <AdminProductGrid />
    </div>
  )
}

function UploadContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Upload & Process Inventory</h2>
      <AdminUploadZone />
    </div>
  )
}

function AIToolsContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Tools & Code Generation</h2>
      <AICodeGenerator />
    </div>
  )
}

function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      <AdminAnalytics />
    </div>
  )
}
