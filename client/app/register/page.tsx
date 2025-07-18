"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Field,
  Fieldset,
  Heading,
} from "@chakra-ui/react";
import { authClient } from "@/components/auth/auth-client";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic goes here
    try {
      await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // Handle successful registration, e.g., redirect to login or home page
      console.log("Registration successful");
    } catch (error) {
      // Handle registration error
      console.error("Registration failed", error);
    }
    setForm({ name: "", email: "", password: "" }); // Reset form after submission
  };

  return (
    <Center h="80vh">
      <Box
        maxW="400px"
        w="full"
        mx="auto"
        mt="20"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Heading mb="6" size="md" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Field.RequiredIndicator />
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Field.RequiredIndicator />
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Field.RequiredIndicator />
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </Field.Root>
              <Button type="submit" width="full" colorScheme="blue">
                Register
              </Button>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </Box>
    </Center>
  );
}
