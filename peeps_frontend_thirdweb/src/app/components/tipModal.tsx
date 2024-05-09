"use client";

import React, { useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ethers } from "ethers";
import {LucideArrowUpRight, LucideHandCoins, LucideX} from "lucide-react";
import {usePeepsContext} from "@/app/context";
import {useRollups} from "@/app/useRollups";
import { ButtonLoader } from "./Button";

export const TipModal = ({address}: {address: string}) => {
    const { baseDappAddress } = usePeepsContext();
    const rollups = useRollups(baseDappAddress);
    const [dp, setDp] = useState<string>("");
    const [depositDescription, setDepositDescription] = useState<string>("");
    const [depositAddress, setDepositAddress] = useState("");
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleSendToken = () => {
        setIsSubmit(true);
        // construct the json payload to send to addInput
        // const jsonPayload = JSON.stringify({
        //   method: "sendToken",
        //   data: {
        //     address: depositAddress,
        //     amount: depositAmount,
        //   },
        // });
        // addInput(JSON.stringify(jsonPayload));
        // console.log(JSON.stringify(jsonPayload));
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <div
                    className={"absolute right-0 btn btn-sm md:btn-md btn-ghost rounded-box font-normal text-xs flex flex-row items-center lg:gap-x-3"}>
                    <LucideHandCoins size={8} width={18} height={18} className={"text-xs"}/>
                </div>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    className="bg-black/40 bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 dark:bg-base-300/80 dark:backdrop-blur-sm z-30" />
                <AlertDialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] bg-base-100 translate-x-[-50%] translate-y-[-50%] rounded-lg p-1 lg:p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dark:bg-base-100">
                    <AlertDialog.Title className="text-mauve12 mt-4 mb-8 text-xl text-center font-bold">
                        Send Token
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-[15px] text-center leading-normal">
                        {/* We require this to serve the best experience */}
                        <div className="card items-center shrink-0 my-4 w-full bg-base-100">
                            <form className="card-body w-full">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address to send token</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Address to send token"
                                        className="input input-bordered readonly:bg-base-200"
                                        defaultValue={address}
                                        onChange={(e) => setDepositAddress(e.target.value)}
                                        readOnly={true}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Amount to send</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="input input-bordered"
                                        onChange={(e) => setDepositAmount(Number(e.target.value))}
                                        required
                                    />
                                </div>
                                {/*<div className="form-control">
                                    <label className="label">
                    <span className="label-text">
                      Describe this transaction
                    </span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-lg textarea-bordered text-base resize-none"
                                        placeholder="describe this transaction. It will help track older transactions"
                                        onChange={(e) => setDepositDescription(e.target.value)}
                                    ></textarea>
                                </div>*/}
                                <div className="form-control mt-6">
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-xl"
                                        onClick={handleSendToken}
                                    >
                                        {isSubmit ? <ButtonLoader /> : "Send"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </AlertDialog.Description>
                    <div className="absolute top-8 right-4 flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <button
                                title="Close Send token dialog"
                                type="button"
                                className="btn size-12 rounded-full text-xl"
                                aria-label="Close"
                            >
                                {/* <Cross2Icon size={64} /> */}
                                <LucideX />
                            </button>
                        </AlertDialog.Cancel>
                        {/* <AlertDialog.Action asChild>
            <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Yes, delete account
            </button>
          </AlertDialog.Action> */}
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};