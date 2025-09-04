import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Users,
  BarChart3,
  Calendar,
  Settings,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Play,
  Star,
  Shield,
  Zap,
  Target,
  Clock,
  Award,
  TrendingUp,
  PieChart,
  Activity,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  MessageSquare,
  FileText,
  AlertCircle,
  ChevronRight,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import BullPopup from "../ui/BullPopup";

function Home() {
  const auth = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  const features = [
    {
      icon: BarChart3,
      title: "Smart Dashboard",
      description:
        "Real-time analytics, task tracking, and performance insights all in one place",
      image: "📊",
    },
    {
      icon: Users,
      title: "Team Management",
      description:
        "Role-based access, user permissions, and collaborative workspaces",
      image: "👥",
    },
    {
      icon: CheckCircle,
      title: "Task Tracking",
      description:
        "Complete task lifecycle management with priorities and deadlines",
      image: "✅",
    },
    {
      icon: Calendar,
      title: "Schedule Planning",
      description:
        "Smart calendar integration with automated reminders and notifications",
      image: "📅",
    },
    {
      icon: Activity,
      title: "Advanced Analytics",
      description:
        "Detailed reports, productivity metrics, and performance analytics",
      image: "📈",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Role-based permissions, audit trails, and secure data management",
      image: "🔒",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp Inc.",
      content:
        "TaskFlow Pro transformed our project management. 40% increase in productivity!",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Team Lead",
      company: "StartupXYZ",
      content:
        "Best task management tool we've used. The analytics are incredibly detailed.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      company: "GrowthLab",
      content:
        "User management features are top-notch. Perfect for our growing team.",
      avatar: "ER",
    },
  ];

  const screenshots = {
    dashboard: {
      title: "Powerful Dashboard",
      description:
        "Get complete overview of your projects, tasks, and team performance",
      mockup: (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Dashboard Overview</h3>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-xs text-blue-500">Active Tasks</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-xs text-green-500">Completed</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">6</div>
              <div className="text-xs text-yellow-500">In Progress</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-xs text-purple-500">Team Members</div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-sm">Website Redesign</span>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                High
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="text-yellow-500" size={16} />
                <span className="text-sm">API Development</span>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded">
                Medium
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-blue-500" size={16} />
                <span className="text-sm">User Testing</span>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">
                Low
              </span>
            </div>
          </div>
        </div>
      ),
    },
    users: {
      title: "Advanced User Management",
      description:
        "Manage your team with role-based permissions and detailed user controls",
      mockup: (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="mr-2" size={18} />
              Team Management
            </h3>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center">
              <Plus size={14} className="mr-1" />
              Add User
            </button>
          </div>
          {[
            {
              name: "John Doe",
              role: "Frontend Dev",
              avatar: "JD",
              type: "admin",
              tasks: 8,
            },
            {
              name: "Jane Smith",
              role: "Backend Dev",
              avatar: "JS",
              type: "manager",
              tasks: 12,
            },
            {
              name: "Mike Johnson",
              role: "UI Designer",
              avatar: "MJ",
              type: "user",
              tasks: 6,
            },
          ].map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.type === "admin"
                      ? "bg-red-100 text-red-800"
                      : user.type === "manager"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.type}
                </span>
                <span className="text-xs text-gray-500">
                  {user.tasks} tasks
                </span>
                <div className="flex space-x-1">
                  <Eye size={14} className="text-blue-500 cursor-pointer" />
                  <Edit size={14} className="text-green-500 cursor-pointer" />
                  <Trash2 size={14} className="text-red-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    analytics: {
      title: "Detailed Analytics",
      description:
        "Track performance with comprehensive reports and visual insights",
      mockup: (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <BarChart3 className="mr-2" size={18} />
              Analytics Dashboard
            </h3>
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center">
              <Download size={14} className="mr-1" />
              Export
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm opacity-90">Completion Rate</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-sm opacity-90">Monthly Target</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Task Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Team Productivity</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Project Progress</span>
                <span>91%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "91%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaskFlow Pro
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#screenshots"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Screenshots
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {!auth?.user?.fullName ? <Link to='/login'><button className="text-gray-600 hover:text-blue-600 transition-colors">
                Login
              </button></Link>:
              <Link to='/dashboard'><button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                Dashboard
              </button></Link>}
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20">
          <nav className="flex flex-col items-center space-y-8 pt-20">
            <a href="#features" className="text-xl text-gray-600">
              Features
            </a>
            <a href="#screenshots" className="text-xl text-gray-600">
              Screenshots
            </a>
            <a href="#testimonials" className="text-xl text-gray-600">
              Reviews
            </a>
            <a href="#pricing" className="text-xl text-gray-600">
              Pricing
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg">
              Get Started
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {auth?.user?.fullName ? `Welcome To ${auth?.user?.fullName}`: 'TaskFlow Pro '}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced Task Management System with Role-Based Access Control,
              Real-time Analytics, and Smart Team Collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to='/dashboard'>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all flex items-center justify-center">
                <Play className="mr-2" size={20} />
                Start Free Trial
              </button>
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 transition-all flex items-center justify-center">
                <Eye className="mr-2" size={20} />
                View Demo
              </button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "50K+", label: "Tasks Completed" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage projects, track progress, and
              collaborate effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.image}</div>
                <feature.icon className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See TaskFlow Pro in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the interface and features that make task management
              effortless
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              {Object.entries(screenshots).map(([key, screen]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {screen.title}
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {screenshots[activeTab].title}
            </h3>
            <p className="text-gray-600 mb-8">
              {screenshots[activeTab].description}
            </p>
            <div className="transform hover:scale-105 transition-transform duration-300">
              {screenshots[activeTab].mockup}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied teams using TaskFlow Pro
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="inline-block text-yellow-400 fill-current"
                    size={24}
                  />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium mb-6">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="opacity-90">
                    {testimonials[currentTestimonial].role} at{" "}
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your team size and needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$9",
                period: "/month",
                features: [
                  "Up to 5 team members",
                  "Basic task management",
                  "Email support",
                  "Mobile apps",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "$29",
                period: "/month",
                features: [
                  "Up to 25 team members",
                  "Advanced analytics",
                  "Priority support",
                  "Custom integrations",
                  "Role-based permissions",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                features: [
                  "Unlimited team members",
                  "Custom features",
                  "24/7 dedicated support",
                  "On-premise deployment",
                  "Advanced security",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 ${
                  plan.popular ? "ring-2 ring-blue-600 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold mb-6">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3" size={16} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                      : "border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of teams already using TaskFlow Pro to manage their
            projects more efficiently
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all">
              Start Free Trial
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold">TaskFlow Pro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Advanced task management for modern teams
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
                  <Globe size={16} />
                </div>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Enterprise"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Help Center", "Contact", "Status"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Privacy"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TaskFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {!auth?.user?.fullName && <BullPopup />}
    </div>
  );
}

export default Home;
