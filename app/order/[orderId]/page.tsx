/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { notFound } from "next/navigation";
import { CheckCircle, Clock, Truck } from "lucide-react";


interface OrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const getStatusDetails = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PAID:
      return {
        label: "Paid",
        variant: "success",
        icon: <CheckCircle className="w-4 h-4 inline mr-1" />,
      };
    case OrderStatus.PENDING:
      return {
        label: "Pending",
        variant: "warning",
        icon: <Clock className="w-4 h-4 inline mr-1" />,
      };
    case OrderStatus.CONFIRMED:
      return {
        label: "Confirmed",
        variant: "warning",
        icon: <Clock className="w-4 h-4 inline mr-1" />,
      };
    case OrderStatus.COMPLETED:
      return {
        label: "Completed",
        variant: "success",
        icon: <CheckCircle className="w-4 h-4 inline mr-1" />,
      };
    case OrderStatus.DELIVERY:
      return {
        label: "Out for Delivery",
        variant: "warning",
        icon: <Truck className="w-4 h-4 inline mr-1" />,
      };
    default:
      return {
        label: status,
        variant: "default",
        icon: null,
      };
  }
};


const variantClasses: Record<string, string> = {
  success: "bg-green-100 text-green-700", // Paid / Completed
  warning: "bg-orange-100 text-orange-600", // Pending / Confirmed / Delivery
  default: "bg-gray-100 text-gray-700",
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return notFound();

  const steps = [
    { label: "Product", key: OrderStatus.PENDING },
    { label: "Shipping & Billing", key: OrderStatus.CONFIRMED },
    { label: "Payment", key: OrderStatus.PAID },
    { label: "Confirm Order", key: OrderStatus.COMPLETED },
    { label: "Out for Delivery", key: OrderStatus.DELIVERY },
  ];

  const currentStep = steps.findIndex((step) => step.key === order.status);

  const statusStyles: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: "bg-gray-100 text-gray-700",
    [OrderStatus.CONFIRMED]: "bg-blue-100 text-blue-600",
    [OrderStatus.PAID]: "bg-green-100 text-green-600",
    [OrderStatus.COMPLETED]: "bg-purple-100 text-purple-600",
    [OrderStatus.DELIVERY]: "bg-orange-100 text-orange-600",
  };

  const { label: statusLabel, icon: statusIcon, variant: statusVariant } = getStatusDetails(order.status as OrderStatus);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      {/* Steps */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            return (
              <div key={step.key} className="flex-1 flex items-center">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      isActive ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  />
                  <p
                    className={`text-xs mt-2 ${
                      isActive ? "text-orange-500 font-semibold" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index !== steps.length - 1 && (
                  <div className={`h-1 flex-1 ${index < currentStep ? "bg-orange-500" : "bg-gray-300"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Header */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-700 mt-1">Order ID: {order.id}</p>
        </div>

        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${variantClasses[statusVariant]}`}>
          {statusIcon} {statusLabel}
              </span>
        
      </div>

      {/* Items */}
      <div className="bg-white p-6 rounded-xl shadow text-black">
        <h2 className="text-lg font-semibold mb-4">Items</h2>
        <div className="divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded border"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">Rs. {item.price} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-black text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm text-black">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rs. {order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Included</span>
          </div>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg text-black">
          <span>Total</span>
          <span>Rs. {order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}