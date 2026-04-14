defmodule Cli.OpenAI do
  def infer(prompt, os) do
    url = Application.get_env(:cli, :openai)[:endpoint]
    key = Application.get_env(:cli, :openai)[:key]

    system_prompt = "
      You are a CLI Translation Engine for a web interface.
      The user is running on: #{os}.

      Your task: Convert the natural language request into a single, executable shell command.
      1. Return ONLY the raw command.
      2. No markdown code blocks, no backticks, no 'Here is your command.'
      3. If the command is dangerous (e.g., deleting root files), prefix it with a comment: # WARNING: HIGH RISK
      4. Use standard, modern syntax for #{os} (e.g., PowerShell for Windows, Zsh/Bash for macOS).
      5. If the request is not a command, return 'Error: Please provide a valid process to automate.'
    "
    body = %{
      model: "google/gemini-3-flash-preview",
      messages: [
        %{role: "system", content: system_prompt},
        %{role: "user", content: prompt}
      ],
      temperature: 0.0
    }

    response = Req.post!(url, headers: %{"Authorization" => "Bearer #{key}"}, json: body)
    response.body["choices"] |> List.first() |> get_in(["message", "content"]) |> String.trim()
  end
end
