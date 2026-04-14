defmodule CliWeb.PageController do
  use CliWeb, :controller

  def home(conn, _params) do
    render(conn, :main)
  end
end
