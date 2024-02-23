"use client"

import Progress from "antd/es/progress"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import YourComponent from "./components/Test"
import DebtForm from "./components/forms/DebtForm"
import DepositForm from "./components/forms/DepositForm"

export default function FinancePage() {
  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <div className="max-w-4xl mx-auto py-16 px-8">
        <h1 className="text-4xl font-bold mb-8">Financial Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#1E1E1E]">
            <CardHeader>
              <CardTitle>Total Income</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <p className="text-2xl font-semibold">$12,000</p>
            </CardContent>
          </Card>
          <Card className="bg-[#1E1E1E]">
            <CardHeader>
              <CardTitle>Total Debt</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <p className="text-2xl font-semib;old">$7,500</p>
            </CardContent>
          </Card>
          <Card className="bg-[#1E1E1E]">
            <CardHeader>
              <CardTitle>Debt Paid Off</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <p className="text-2xl font-semibold">$4,500</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Progress</h2>
          <div className="bg-[#1E1E1E] p-6 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Debt Payoff Progress</span>
              <span>60%</span>
            </div>
            <Progress
              className="w-full bg-[#333333] h-4 rounded-md"
              percent={60}
            />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Debt Details</h2>
          <div className="bg-[#1E1E1E] p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Creditor</h3>
                <p>,Bank of America</p>
                <div>
                  <h3 className="text-xl font-bold mb-2">Date</h3>
                  <p>January 1, 2024</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Debt Amount</h3>
                  <p>$5,000</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Paid Off</h3>
                  <p>$2,500</p>
                </div>
              </div>
            </div>
          </div>
          <DebtForm />
          <DepositForm />
          <YourComponent userId={undefined} />
        </div>
      </div>
    </div>
  )
}
