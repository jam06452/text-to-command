# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :cli, :openai,
  endpoint: System.get_env("OPENAI_ENDPOINT"),
  key: System.get_env("OPENAI_KEY")

config :cli,
  generators: [timestamp_type: :utc_datetime]

# Configure the endpoint
config :cli, CliWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: CliWeb.ErrorHTML, json: CliWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Cli.PubSub,
  live_view: [signing_salt: "XWbrseIE"]

# Configure the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :cli, Cli.Mailer, adapter: Swoosh.Adapters.Local

# Configure tailwind (the version is required)
# Note: Tailwind is disabled for React app, which uses Vite for CSS handling
config :tailwind,
  version: "4.1.12",
  cli: [
    args: ~w(
      --input=assets/tailwind.css
      --output=priv/static/assets/css/tailwind.css
    ),
    cd: Path.expand("..", __DIR__)
  ]

# Configure Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
