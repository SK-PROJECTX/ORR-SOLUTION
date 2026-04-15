import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

export default function PaymentDetailsPage() {
  const { t } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(true);

  return (
    <div className="min-h-screen w-full text-foreground px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="w-full">
        <div className="flex justify-between ">

        <h1 className="text-3xl font-semibold text-lemon mb-6 text-nowrap">{interpolate(t.dashboard.payment.title)}</h1>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-10">
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder={interpolate(t.dashboard.common.search)}
              className="w-full bg-card rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-lemon text-lg">
              🔍
            </button>
          </div>
        </div>
        </div>


        {/* Contact Dropdown */}
        <div className="bg-card border border-secondary rounded-lg mb-4">
          <div 
            className="py-4 px-6 flex justify-between items-center cursor-pointer hover:bg-card/80"
            onClick={() => setContactOpen(!contactOpen)}
          >
            <h3 className="text-lg font-semibold">{interpolate(t.dashboard.payment.contact)}</h3>
            <ChevronDown className={`text-lemon w-5 h-5 transition-transform ${contactOpen ? 'rotate-180' : ''}`} />
          </div>
          {contactOpen && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">{interpolate(t.dashboard.payment.fullName)}</label>
                  <input className="w-full bg-background border border-secondary rounded-md px-4 py-3 text-sm focus:outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm mb-2">{interpolate(t.dashboard.payment.email)}</label>
                  <input className="w-full bg-background border border-secondary rounded-md px-4 py-3 text-sm focus:outline-none" placeholder="john@example.com" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Dropdown */}
        <div className="bg-card border border-secondary rounded-lg">
          <div 
            className="py-4 px-6 flex justify-between items-center cursor-pointer hover:bg-card/80"
            onClick={() => setPaymentOpen(!paymentOpen)}
          >
            <h3 className="text-lg font-semibold text-lemon">{interpolate(t.dashboard.payment.payment)}</h3>
            <ChevronDown className={`text-lemon w-5 h-5 transition-transform ${paymentOpen ? 'rotate-180' : ''}`} />
          </div>
          {paymentOpen && (
            <div className="px-6 pb-6">

          {/* Payment Method */}
          <h4 className="text-md font-semibold mb-4">{interpolate(t.dashboard.payment.method)}</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Visa */}
            <div className="bg-white text-black rounded-lg p-4 flex items-center justify-between shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-lemon rounded-sm"></div>
                <div>
                  <p className="font-semibold text-sm">347809</p>
                  <span className="text-xs text-black">Visa · {interpolate(t.dashboard.payment.edit)}</span>
                </div>
              </div>
              <span className="text-lg font-bold">VISA</span>
            </div>

            {/* Paypal */}
            <div className="bg-white text-black rounded-lg p-4 flex items-center justify-between shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-sm"></div>
                <div>
                  <p className="font-semibold text-sm">347809</p>
                  <span className="text-xs text-black">Paypal · {interpolate(t.dashboard.payment.edit)}</span>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600">PP</span>
            </div>

            {/* Add New */}
            <div className="bg-white text-black rounded-lg p-4 flex flex-col items-center justify-center shadow cursor-pointer">
              <div className="w-8 h-8 rounded-md bg-lemon flex items-center justify-center text-black font-bold text-xl mb-2">+</div>
              <p className="text-sm font-semibold">{interpolate(t.dashboard.payment.newUsers)}</p>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm mb-2">{interpolate(t.dashboard.payment.cardHolder)}</label>
              <input
                className="w-full bg-background border border-lemon rounded-md px-4 py-3 text-sm focus:outline-none"
                placeholder="John Walden"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{interpolate(t.dashboard.payment.billingAddress)}</label>
              <input
                className="w-full bg-background border border-lemon rounded-md px-4 py-3 text-sm focus:outline-none"
                placeholder="Germany"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{interpolate(t.dashboard.payment.zipCode)}</label>
              <input
                className="w-full bg-background border border-lemon rounded-md px-4 py-3 text-sm focus:outline-none"
                placeholder="6789123"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">{interpolate(t.dashboard.payment.city)}</label>
              <input
                className="w-full bg-background border border-lemon rounded-md px-4 py-3 text-sm focus:outline-none"
                placeholder="Berlain"
              />
            </div>
          </div>

          {/* Invoice Address */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 border border-lemon rounded-sm bg-lemon"></div>
            <label className="text-sm">{interpolate(t.dashboard.payment.invoiceAddress)}</label>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-lemon text-black font-semibold rounded-md py-3">
            {interpolate(t.dashboard.payment.pay, { amount: '$67.00' })}
          </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
