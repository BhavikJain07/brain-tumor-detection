"use client";
import React, { useState, useRef } from "react";
import { ModeToggle } from "@/components/ThemeToggle";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

function Page() {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = async (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  const handlePredict = async (e) => {
    setLoading(true);
    setTimeout(() => {
      setPrediction({
        yes: 50,
        no: 50,
      });
      setLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setFile(null);
    setPrediction(null);
    document.getElementById("picture").value = null;
  };

  const [prediction, setPrediction] = useState(null);

  return (
    <div className="max-w-screen min-h-screen flex justify-center align-middle flex-row">
      <Card className="w-full m-8">
        <CardHeader>
          <div className="w-full justify-between flex flex-row">
            <CardTitle>Brain Tumor Detection</CardTitle>
            <ModeToggle />
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-row justify-between">
            <div className="w-1/2 h-full m-1">
              <Card>
                <CardHeader>
                  <CardTitle>Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-1.5 my-3">
                    <Label htmlFor="picture">Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                      disabled={isLoading}
                    />
                  </div>
                  <Separator className="my-3" />
                  <Card className="my-3 flex justify-center align-middle p-2">
                    <CardContent>
                      {file && (
                        <Image
                          width={200}
                          height={200}
                          src={file}
                          alt="Input Image"
                        />
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2 h-full m-1">
              {isLoading ? (
                <>
                  <Card>
                    <CardContent className="w-full flex flex-row justify-center align-middle m-2">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </CardContent>
                  </Card>
                </>
              ) : (
                <></>
              )}
              {prediction && (
                <Card>
                  <CardHeader>
                    <CardTitle>Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="yesProgress">Yes</Label>
                    <Progress id="yesProgress" value={prediction.yes} />
                    <Label htmlFor="noProgress">No</Label>
                    <Progress id="noProgress" value={prediction.no} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-end">
            <Button
              variant="secondary"
              className="m-1"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </Button>
            <Button
              className="m-1"
              onClick={(e) => handlePredict(e)}
              disabled={isLoading}
            >
              Predict
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
