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
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { authClient } from "@/components/auth/auth-client";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signIn.email({
      email: form.email,
      password: form.password,
      callbackURL: "/",
    });
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Fieldset.Root>
            <Fieldset.Content>
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
                Login
              </Button>
              <Text fontSize="sm" textAlign="center">
                <Link href="/register">Create account</Link>
              </Text>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </Box>
    </Center>
  );
}
