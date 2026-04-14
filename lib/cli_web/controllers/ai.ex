defmodule CliWeb.AIController do
  use CliWeb, :controller

  def infer(conn, %{"prompt" => prompt, "os" => os}) do
    command = Cli.OpenAI.infer(prompt, os)
    json(conn, %{command: command})
  end
end
