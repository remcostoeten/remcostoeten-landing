"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/core/database/auth"
import { addDoc, collection, doc, getFirestore } from "firebase/firestore"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InputWithLabel from "@/components/generics/InputWithELement"
import { Icons } from "@/components/icons"
import IntroShell from "@/components/layout/IntroShell"

import useFirestoreCollection from "../../data/useFirestoreCollection"
import { DifferentDepositChooser } from "../Shells/DifferentDepositChooser"

interface Debt {
  nameOfDebt: string
}

export default function DepositForm() {
  const [amountDeposited, setAmountDeposited] = useState(0)
  const [nameOfDebt, setNameOfDebt] = useState("")
  const { user } = useAuth()
  const userId = user?.uid
  const db = getFirestore()

  const {
    data: debts,
    loading,
    error,
  } = useFirestoreCollection(db, `users/${userId}/debt`)

  useEffect(() => {
    if (debts) {
      console.log("debs", debts)
    }
  }, [debts])

  const handleSubmit = async () => {
    try {
      if (user) {
        const userId = user.uid
        const userDocRef = doc(db, "users", userId)
        const depositCollectionRef = collection(userDocRef, "deposit")
        const depositData = {
          nameOfDebt: nameOfDebt,
          amountDeposited: amountDeposited,
        }
        await addDoc(depositCollectionRef, depositData)
        toast.success(
          `Deposit data added successfully. Name of Debt - ${nameOfDebt}, Amount Deposited - ${amountDeposited}`
        )
      }
    } catch (error) {
      console.error("Error adding deposit data: ", error)
      toast.error("Failed to add deposit data")
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <IntroShell
          spacingBottom="0"
          spacingTop="0"
          showSeperator={false}
          title="What kind of deposit are you making?"
          tooltipIcon={<Icons.tooltip />}
          tooltipContent="Either add a deposit to your savings balance <br> or add a deposit to subtract from a specific debt"
        />
        <DifferentDepositChooser
          tabs={[
            {
              title: "Debt payoff",
              description: "Add a deposit to subtract from a specific debt.",
              values: (
                <Select onValueChange={(value: string) => setNameOfDebt(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Debt" />
                  </SelectTrigger>
                  <SelectContent>
                    {debts.map((debt: Debt, index) => (
                      <SelectItem
                        key={index}
                        value={debt.nameOfDebt}
                        onChange={undefined}
                      >
                        {debt.nameOfDebt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ),
            },
            {
              title: "Add savings",
              description: "Add a deposit to your savings balance.",
              values: (
                <>
                  <InputWithLabel
                    label="Amount Deposited"
                    value={amountDeposited}
                    onChange={(e) =>
                      setAmountDeposited(parseFloat(e.target.value))
                    }
                  />
                  <Button>Submit</Button>
                </>
              ),
            },
          ]}
          defaultTabValue="Savings"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <Select onValueChange={(value: string) => setNameOfDebt(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Debt" />
          </SelectTrigger>
          <SelectContent>
            {debts.map((debt: Debt) => (
              <SelectItem key={debt.nameOfDebt} value={debt.nameOfDebt}>
                {debt.nameOfDebt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <InputWithLabel
          label="Amount Deposited"
          value={amountDeposited}
          onChange={(e) => setAmountDeposited(parseFloat(e.target.value))}
        />
      </form>
    </div>
  )
}
