defmodule CliWeb.ErrorJSONTest do
  use CliWeb.ConnCase, async: true

  test "renders 404" do
    assert CliWeb.ErrorJSON.render("404.json", %{}) == %{errors: %{detail: "Not Found"}}
  end

  test "renders 500" do
    assert CliWeb.ErrorJSON.render("500.json", %{}) ==
             %{errors: %{detail: "Internal Server Error"}}
  end
end
