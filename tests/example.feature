Feature: Product search

    Background:
        Given the application is running
        And I am on the homepage

    @smoke @search
    Scenario Outline: Search returns relevant results
        When I search for "<query>"
        Then the results should include items related to "<query>"
        And there should be at least <minResults> results

        Examples:
            | query       | minResults |
            | "laptop"    | 1          |
            | "headphones"| 1          |
            | "charger"   | 1          |

    @regression
    Scenario: Empty search shows validation message
        When I search for ""
        Then I should see a validation error "Please enter a search term"

    Scenario: Search with filters narrows results
        Given I search for "phone"
        And I apply the filter "brand: Acme"
        When the results load
        Then every result should have the brand "Acme"